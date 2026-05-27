// @ts-nocheck -- legacy JS migration; remove after adding explicit types.
export async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
