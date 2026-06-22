declare module "*.mp4" {
  const src: string
  export default src
}

declare module "*.glb" {
  const src: string
  export default src
}

declare module "*.woff2" {
  const src: string
  export default src
}

declare module "nodemailer" {
  type SendMailOptions = Record<string, unknown>

  export type SentMessageInfo = {
    response: string
  }

  export type Transporter = {
    sendMail(options: SendMailOptions): Promise<SentMessageInfo>
  }

  const nodemailer: {
    createTransport(options: SendMailOptions): Transporter
  }

  export default nodemailer
}

declare module "three" {
  export const Cache: {
    enabled: boolean
  }

  export class TextureLoader {
    loadAsync(src: string): Promise<unknown>
  }
}
