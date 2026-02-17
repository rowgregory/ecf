'use client'

import { IUser } from '@/types/entities/user'

const UsersClient = ({ data }: { data: IUser[] }) => {
  console.log('UsersClient: ', data)
  return <>UsersClient</>
}

export default UsersClient
