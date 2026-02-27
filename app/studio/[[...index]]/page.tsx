import StudioClient from './StudioClient'

export function generateStaticParams() {
  // Required for static export with optional catch-all routes.
  return [{}]
}

export default function StudioPage() {
  return <StudioClient />
}
