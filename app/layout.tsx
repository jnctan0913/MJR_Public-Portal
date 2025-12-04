import type { Metadata } from 'next'
import { Poppins, Zilla_Slab } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

const zillaSlab = Zilla_Slab({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-zilla',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Obesity is a Disease | SG',
  description: 'It\'s time for a real change in weight loss. Learn about obesity as a chronic disease and explore comprehensive weight management approaches.',
  icons: {
    icon: '/images/OIAD.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${zillaSlab.variable} font-poppins`}>
        {children}
      </body>
    </html>
  )
}

