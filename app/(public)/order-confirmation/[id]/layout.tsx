import { getOrder } from '@/app/lib/actions/getOrder'
import OrderConfirmationPage from './page'
import { notFound } from 'next/navigation'

export default async function OrderConfirmationLayout({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = await getOrder(id)

  if (!order) notFound()

  return <OrderConfirmationPage order={order} />
}
