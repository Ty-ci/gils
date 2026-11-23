import './globals.css'

import type { Metadata } from 'next'
import { Georama } from 'next/font/google'
import type { ReactNode } from 'react'

import AccessGate from '@/app/_components/AccessGate'
import PlaceholderBanner from '@/app/_components/PlaceholderBanner'
import SiteFooter from '@/app/_components/SiteFooter'
import SiteHeader from '@/app/_components/SiteHeader'
import { site } from '@/lib/site'

// Self-hosted by next/font; `latin-ext` carries the Slovak diacritics. Exposed
// as `--font-georama`, which `--font-sans` in globals.css builds on.
const georama = Georama({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-georama',
})

export const metadata: Metadata = {
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  icons: { icon: '/lily.svg' },
  // An internal tool: kept out of search engines (see also `app/robots.ts`).
  robots: { index: false, follow: false },
}

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="sk" className={georama.variable}>
    <body className="flex min-h-screen flex-col">
      {/* Banner and header stick as one block, the warning on top: while the
          site is being built, every page of it carries placeholder content. */}
      <div className="sticky top-0 z-50">
        <PlaceholderBanner>
          POZOR, obsah tohto webu je len na ukážku - informácie nie sú smerodajné, slúžia zatiaľ len
          ako placeholder.
        </PlaceholderBanner>
        <SiteHeader />
      </div>
      <main className="flex-1">
        <AccessGate>{children}</AccessGate>
      </main>
      <SiteFooter />
    </body>
  </html>
)

export default RootLayout
