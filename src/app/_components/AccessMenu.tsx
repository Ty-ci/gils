'use client'

import {
  Button as AriaButton,
  Dialog,
  DialogTrigger,
  Heading,
  Popover,
} from 'react-aria-components'

import Button from '@/app/_components/Button'
import { signOut, useActiveKeys } from '@/lib/access/client'
import { accessKeyInfo } from '@/lib/navigation'

const KeyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="size-4"
  >
    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
  </svg>
)

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="mt-1 size-4 shrink-0 text-green"
  >
    <path d="m5 12 5 5 9-10" />
  </svg>
)

// Who's signed in with what, in the header: a chip naming the strongest
// permission this browser holds, opening a menu that lists them all and
// signs out. Never shows a password. Hidden while nothing is unlocked.
const AccessMenu = () => {
  const keys = useActiveKeys()
  const strongest = keys.at(-1)

  if (!strongest) {
    return null
  }

  // Edit rides on top of view: dropping it alone leaves the pages readable.
  const extras = keys.slice(1)
  const isEditing = strongest === 'whole-web-edit'

  return (
    <DialogTrigger>
      <AriaButton
        className={`inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-leaf px-3 text-sm font-semibold text-navy focus-ring transition-colors duration-200 hover:bg-navy hover:text-white ${
          isEditing ? 'bg-yellow-tint' : 'bg-blue-tint'
        }`}
      >
        <KeyIcon />
        <span className="sr-only">Prístup: </span>
        {accessKeyInfo[strongest].label}
      </AriaButton>

      <Popover
        placement="bottom end"
        offset={8}
        // Portalled to the end of <body>: on par with the sticky header, it paints over it.
        className="z-50 w-72 max-w-[calc(100vw-2rem)] rounded-card border border-line bg-white p-5 shadow-float outline-none"
      >
        <Dialog className="outline-none">
          <Heading slot="title" className="eyebrow text-navy">
            Tvoj prístup
          </Heading>
          <p className="mt-1 text-xs/5 text-muted">Heslá si pamätá tento prehliadač.</p>

          <ul className="mt-4 flex flex-col gap-3">
            {keys.map((key) => (
              <li key={key} className="flex gap-2">
                <CheckIcon />
                <div>
                  <p className="text-sm font-semibold text-navy">{accessKeyInfo[key].label}</p>
                  <p className="text-xs/5 text-muted">{accessKeyInfo[key].description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4">
            <Button variant="outline" size="sm" onClick={() => signOut()}>
              Odhlásiť sa
            </Button>
            {extras.map((key) => (
              <Button key={key} variant="ghost" size="sm" onClick={() => signOut([key])}>
                Vypnúť {accessKeyInfo[key].label.toLowerCase()}
              </Button>
            ))}
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  )
}

export default AccessMenu
