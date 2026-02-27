/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_ACTIONS === 'true'
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const isUserOrOrgPages = repoName.endsWith('.github.io')
const basePath = isGithubPages && !isUserOrOrgPages ? `/${repoName}` : ''

const nextConfig = {
  reactStrictMode: true,
  output: isGithubPages ? 'export' : undefined,
  trailingSlash: isGithubPages,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: isGithubPages,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
}

module.exports = nextConfig



