import Button from '@/app/_components/Button'
import Lily from '@/app/_components/Lily'
import Section from '@/app/_components/Section'

const NotFound = () => (
  <Section py="py-24 md:py-32">
    <div className="flex flex-col items-center text-center">
      <Lily className="size-16 text-navy" />
      <p className="mt-6 eyebrow text-muted">Chyba 404</p>
      <h1 className="mt-2 text-h1 font-bold max-md:text-[2.125rem]">Táto stránka tu nie je</h1>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Na úvod</Button>
      </div>
    </div>
  </Section>
)

export default NotFound
