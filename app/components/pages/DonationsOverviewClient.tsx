'use client'

import { IOrder } from '@/types/entities/order'

const DonationsOverviewClient = ({ data }: { data: IOrder[] }) => {
  console.log('DonationsOverviewClient: ', data)
  return <>DonationsOverviewClient</>
}

export default DonationsOverviewClient
