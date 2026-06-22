import Head from 'next/head'

const siteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://afolabi.info'
const name = 'Afolabi Aiyeloja'

export type SocialImage = {
  src: string
  alt: string
  width?: number
  height?: number
  type?: string
}

const defaultSocialImage = {
  src: '/social-image.png',
  alt: 'Social preview for Afolabi Aiyeloja portfolio.',
  width: 1200,
  height: 630,
  type: 'image/png',
} satisfies SocialImage

function absoluteUrl(value = '/') {
  return new URL(value, siteUrl).toString()
}

type MetaProps = {
  title?: string
  description: string
  prefix?: string
  route?: string
  ogImage?: string
  socialImage?: SocialImage
}

export const Meta = ({
  title,
  description,
  prefix = name,
  route = '/',
  ogImage,
  socialImage,
}: MetaProps) => {
  const titleText = [prefix, title].filter(Boolean).join(' | ')
  const image = socialImage ?? {
    ...defaultSocialImage,
    src: ogImage ?? defaultSocialImage.src,
  }
  const imageUrl = absoluteUrl(image.src)
  const pageUrl = absoluteUrl(route)

  return (
    <Head>
      <title key="title">{titleText}</title>
      <meta key="description" name="description" content={description} />
      <meta name="author" content={name} />

      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={image.alt} />
      <meta property="og:image:type" content={image.type ?? defaultSocialImage.type} />
      <meta
        property="og:image:width"
        content={String(image.width ?? defaultSocialImage.width)}
      />
      <meta
        property="og:image:height"
        content={String(image.height ?? defaultSocialImage.height)}
      />

      <meta property="og:title" content={titleText} />
      <meta property="og:site_name" content={name} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:title" content={titleText} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={image.alt} />
    </Head>
  )
}
