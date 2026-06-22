import { z } from 'zod'

export const CONTACT_EMAIL_MAX_LENGTH = 320
export const CONTACT_MESSAGE_MAX_LENGTH = 720

export const contactSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Enter a valid email address')
    .max(CONTACT_EMAIL_MAX_LENGTH, 'Email is too long'),
  message: z
    .string()
    .trim()
    .min(1, 'Enter a message')
    .max(CONTACT_MESSAGE_MAX_LENGTH, 'Message is too long'),
})

export type ContactPayload = z.infer<typeof contactSchema>

export function parseContactPayload(payload: unknown) {
  return contactSchema.safeParse(payload)
}
