// scripts/backfill-missing-order.ts
// One-time backfill for a real recurring donation that succeeded on Stripe
// but failed to record in the DB (unique-constraint crash, now fixed).
// Run once, then delete. Does NOT send a confirmation email.

import prisma from "../prisma/client.ts";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-08-27.basil",
});

const SUBSCRIPTION_ID = "sub_1TbRi7E2eqZhd2FletFClHxE";

async function resolvePaymentIntentId(invoiceId) {
  const invoicePayments = await stripe.invoicePayments.list({
    invoice: invoiceId,
  });
  const defaultPayment = invoicePayments.data.find((p) => p.is_default);
  if (defaultPayment?.payment?.type === "payment_intent") {
    return typeof defaultPayment.payment.payment_intent === "string"
      ? defaultPayment.payment.payment_intent
      : (defaultPayment.payment.payment_intent?.id ?? null);
  }
  return null;
}

async function main() {
  const subscription = await stripe.subscriptions.retrieve(SUBSCRIPTION_ID, {
    expand: ["default_payment_method", "customer"],
  });
  const customer = subscription.customer;
  const meta = subscription.metadata || {};

  const paymentMethodId =
    typeof subscription.default_payment_method === "string"
      ? subscription.default_payment_method
      : (subscription.default_payment_method?.id ?? null);

  const frequency = meta.frequency || "monthly";
  const anchor = new Date(subscription.billing_cycle_anchor * 1000);
  const nextBillingDate =
    frequency === "yearly"
      ? new Date(anchor.setFullYear(anchor.getFullYear() + 1))
      : new Date(anchor.setMonth(anchor.getMonth() + 1));

  const invoices = await stripe.invoices.list({
    subscription: SUBSCRIPTION_ID,
    status: "paid",
    limit: 100,
  });
  console.log(`Found ${invoices.data.length} paid invoice(s) on Stripe`);

  for (const invoice of invoices.data) {
    const paymentIntentId = await resolvePaymentIntentId(invoice.id);

    // 1) Already recorded by invoice id? Nothing to do.
    const byInvoice = await prisma.order.findUnique({
      where: { stripeInvoiceId: invoice.id },
    });
    if (byInvoice) {
      console.log(
        `  skip ${invoice.id} — already has stripeInvoiceId (${byInvoice.id})`,
      );
      continue;
    }

    // 2) Pre-existing row from before the invoice field existed?
    //    Match on subscription + paymentIntent and backfill stripeInvoiceId.
    const legacyRow = paymentIntentId
      ? await prisma.order.findFirst({
          where: {
            stripeSubscriptionId: SUBSCRIPTION_ID,
            paymentIntentId,
            stripeInvoiceId: null,
          },
        })
      : null;

    if (legacyRow) {
      await prisma.order.update({
        where: { id: legacyRow.id },
        data: { stripeInvoiceId: invoice.id },
      });
      console.log(
        `  patched ${legacyRow.id} — set stripeInvoiceId ${invoice.id}`,
      );
      continue;
    }

    // 3) Genuinely missing — create the row.
    const order = await prisma.order.create({
      data: {
        type: "RECURRING_DONATION",
        status: "CONFIRMED",
        totalAmount: invoice.amount_paid / 100,
        paymentMethod: "stripe",
        customerEmail:
          meta.email || customer?.email || invoice.customer_email || "",
        customerName: meta.name || customer?.name || "",
        userId: meta.userId || null,
        stripeSubscriptionId: SUBSCRIPTION_ID,
        stripeInvoiceId: invoice.id,
        paymentIntentId,
        paymentMethodId,
        isRecurring: true,
        recurringFrequency: frequency,
        coverFees: meta.coverFees === "true",
        feesCovered: parseFloat(meta.feesCovered || "0"),
        paidAt: invoice.status_transitions?.paid_at
          ? new Date(invoice.status_transitions.paid_at * 1000)
          : new Date(),
        nextBillingDate,
      },
    });
    console.log(
      `  created ${order.id} for ${order.totalAmount} (invoice ${invoice.id})`,
    );
  }

  console.log("\nDone. Verifying rows for this subscription:");
  const rows = await prisma.order.findMany({
    where: { stripeSubscriptionId: SUBSCRIPTION_ID },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      totalAmount: true,
      userId: true,
      stripeInvoiceId: true,
      paidAt: true,
    },
  });
  console.log(JSON.stringify(rows, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
