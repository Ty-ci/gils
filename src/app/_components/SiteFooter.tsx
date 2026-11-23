import Link from 'next/link'

import Container from '@/app/_components/Container'
import Lily from '@/app/_components/Lily'
import { navRoutes } from '@/lib/navigation'
import { site } from '@/lib/site'

const SiteFooter = () => (
  <footer className="bg-navy py-8 text-white">
    <Container className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
      <div className="flex max-w-sm items-start gap-3">
        <Lily className="size-10 shrink-0 text-white" />
        <p className="text-sm/6 text-white/85">{site.description}</p>
      </div>

      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
        {navRoutes
          .filter(({ path }) => path !== '/')
          .map(({ path: href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:text-yellow hover:decoration-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow"
              >
                {label}
              </Link>
            </li>
          ))}
      </ul>
    </Container>
  </footer>
)

export default SiteFooter
