'use client'

export default function DebugEnv() {
  return (
    <pre style={{ position: 'fixed', bottom: 0, left: 0, background: 'white', padding: 8, fontSize: 10, zIndex: 9999 }}>
      Pusher key set: {String(!!process.env.NEXT_PUBLIC_PUSHER_APP_KEY)}
      {'\n'}
      Pusher cluster set: {String(!!process.env.NEXT_PUBLIC_PUSHER_CLUSTER)}
    </pre>
  )
}
