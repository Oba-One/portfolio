// @ts-nocheck -- legacy JS migration; remove after adding explicit types.
export function formatDate(date) {
  return new Date(date).toLocaleDateString('default', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  })
}
