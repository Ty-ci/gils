import Eyebrow from '@/app/_components/Eyebrow'
import Lily from '@/app/_components/Lily'
import Section from '@/app/_components/Section'
import { site } from '@/lib/site'

const Home = () => (
  <Section py="py-16 md:py-24 lg:py-32" labelledBy="hero-title">
    <div className="grid items-center gap-12 md:grid-cols-[1fr_auto]">
      <div className="max-w-2xl">
        <Eyebrow>Interný web</Eyebrow>
        <h1 id="hero-title" className="mt-5 text-display font-extrabold max-md:text-[2.5rem]/[1.1]">
          {site.name}
        </h1>
        <p className="mt-6 max-w-[65ch] text-lead text-pretty">{site.description}</p>
      </div>

      {/* The lily on a yellow disc, turning slowly — the one place on the site
          that moves on its own (DESIGN_SPECS.md §7). */}
      <div className="mx-auto flex size-56 items-center justify-center rounded-full bg-yellow perspective-midrange sm:size-72 lg:size-80">
        <Lily className="w-1/2 text-navy" />
      </div>
    </div>
  </Section>
)

export default Home
