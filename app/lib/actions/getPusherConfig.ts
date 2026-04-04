'use server'

export const getPusherConfig = async () => {
  return {
    key: process.env.PUSHER_APP_KEY!,
    cluster: process.env.PUSHER_CLUSTER!
  }
}
