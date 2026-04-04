export const formatTime = (d: Date | string | null) => {
  if (!d) return ''
  return new Date(d).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  })
}
