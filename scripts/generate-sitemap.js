/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const { bundleMDX } = require('mdx-bundler')
const { homepage } = require('../package.json')

const siteRoutes = JSON.parse(fs.readFileSync('src/utils/siteRoutes.json', 'utf8'))
const siteUrl = (process.env.NEXT_PUBLIC_WEBSITE_URL || homepage).replace(/\/$/, '')

function addRoute(route) {
  return `  <url>
    <loc>${`${siteUrl}${route}`}</loc>
    <changefreq>monthly</changefreq>
  </url>`
}

async function addPost(post) {
  const source = fs.readFileSync(post, 'utf-8')
  const { frontmatter } = await bundleMDX({ source })

  if (process.env.NODE_ENV === 'production' && frontmatter.draft) return

  const path = post.replace('src/posts', '/articles').replace('.mdx', '')

  return `  <url>
    <loc>${`${siteUrl}${path}`}</loc>
    <changefreq>monthly</changefreq>
  </url>`
}

async function generateSitemap() {
  const { globby } = await import('globby')
  const postUrls = await globby(['src/posts/**/*.mdx'])
  const posts = await Promise.all(postUrls.map(addPost))

  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${siteRoutes.publicRoutes.map(addRoute).join('\n')}
${posts.filter(Boolean).join('\n')}
</urlset>\n`

  fs.writeFileSync('public/sitemap.xml', sitemap)
}

generateSitemap()
