'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity/config'

export function generateStaticParams() {
  // Required for static export with optional catch-all routes.
  return [{}]
}

export default function StudioPage() {
  return <NextStudio config={config} />
}
