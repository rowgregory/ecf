import prisma from "../prisma/client.ts";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-08-27.basil",
});

const SUBSCRIPTION_ID = "sub_1TbRi7E2eqZhd2FletFClHxE";

async function main() {
  const sub = await stripe.subscriptions.retrieve(SUBSCRIPTION_ID);

  // Basil: current_period_end may live on the item rather than top-level
  const periodEnd =
    sub.current_period_end || sub.items?.data?.[0]?.current_period_end || null;

  if (!periodEnd) {
    throw new Error("Could not resolve current_period_end from subscription");
  }

  const nextBillingDate = new Date(periodEnd * 1000);
  console.log("Real next charge date:", nextBillingDate.toISOString());

  const result = await prisma.order.updateMany({
    where: {
      stripeSubscriptionId: SUBSCRIPTION_ID,
      status: { in: ["CONFIRMED", "PROCESSING"] },
    },
    data: { nextBillingDate },
  });

  console.log(`Updated ${result.count} row(s)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
