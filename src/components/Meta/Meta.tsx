import Head from 'next/head'

const siteUrl = (process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://afolabi.info').replace(
  /\/+$/,
  ''
)
const name = 'Afolabi Aiyeloja'
const socialProfiles = [
  'https://github.com/Oba-One',
  'https://www.linkedin.com/in/afolabi-aiyeloja/',
]

export type SocialImage = {
  src: string
  alt: string
  width?: number
  height?: number
  type?: string
}

const defaultSocialImage = {
  src: '/social/home.png',
  alt: 'Social preview for Afolabi Aiyeloja portfolio.',
  width: 1200,
  height: 630,
  type: 'image/png',
} satisfies SocialImage

function absoluteUrl(value = '/') {
  return new URL(value, `${siteUrl}/`).toString()
}

function normalizeText(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

function normalizeRoute(route = '/') {
  const url = new URL(route, `${siteUrl}/`)
  const pathname = url.pathname === '/' ? '/' : `${url.pathname.replace(/\/+$/, '')}/`

  return `${pathname}${url.search}${url.hash}`
}

type MetaProps = {
  title?: string
  description: string
  prefix?: string
  route?: string
  ogImage?: string
  socialImage?: SocialImage
  noIndex?: boolean
}

export const Meta = ({
  title,
  description,
  prefix = name,
  route = '/',
  ogImage,
  socialImage,
  noIndex = false,
}: MetaProps) => {
  const titleText = normalizeText([prefix, title].filter(Boolean).join(' | '))
  const descriptionText = normalizeText(description)
  const image = socialImage ?? {
    ...defaultSocialImage,
    src: ogImage ?? defaultSocialImage.src,
  }
  const imageUrl = absoluteUrl(image.src)
  const pageUrl = absoluteUrl(normalizeRoute(route))
  const robots = noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
  const structuredData =
    pageUrl === `${siteUrl}/`
      ? {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name,
          url: pageUrl,
          jobTitle: 'Systems architect and steward',
          sameAs: socialProfiles,
        }
      : null

  return (
    <Head>
      <title key="title">{titleText}</title>
      <meta key="description" name="description" content={descriptionText} />
      <meta key="robots" name="robots" content={robots} />
      <meta name="author" content={name} />
      <link key="canonical" rel="canonical" href={pageUrl} />

      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
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
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:description" content={descriptionText} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:description" content={descriptionText} />
      <meta name="twitter:title" content={titleText} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={image.alt} />
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  )
}
