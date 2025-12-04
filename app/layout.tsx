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
  title: 'Obesity Is A Disease | DKSH SG',
  description: 'It\'s time for a mindset shift about weight loss. Discover why weight loss is challenging and how to achive lasting result & improved well-being.',
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

