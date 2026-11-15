import { navigation, sheet, socialLinks } from "@/lib/data";
import Cursor from "./Cursor";

/** The strip along the top edge of the sheet: drawing number, index, position. */
export default function SheetHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-[var(--header-h)] items-stretch border-b border-line bg-paper">
      <a
        href="#top"
        aria-label="Sebastian Jara — back to top"
        className="anno flex items-center border-r border-line px-5 font-medium transition-colors hover:text-accent sm:px-8 lg:w-[44px] lg:justify-center lg:px-0"
      >
        <span className="lg:hidden">{sheet.number}</span>
        <span className="hidden lg:inline">SJ</span>
      </a>

      <div className="anno hidden items-center border-r border-line px-12 lg:flex">
        {sheet.number}
        <span className="mx-3 text-ink-soft">/</span>
        <span className="text-ink-soft">Sheet 01 of 01</span>
      </div>

      <nav aria-label="Primary" className="flex min-w-0 flex-1 items-center">
        <ul className="anno flex w-full items-center justify-end gap-5 px-5 sm:gap-8 sm:px-8 lg:justify-start lg:px-12">
          {navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block py-3 transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="hidden sm:block">
            <a
              href={socialLinks.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-3 transition-colors hover:text-accent"
            >
              Résumé ↗
            </a>
          </li>
        </ul>
      </nav>

      <div className="anno hidden items-center whitespace-pre border-l border-line px-6 text-ink-soft xl:flex">
        {sheet.coordinates}
      </div>
      <div className="hidden w-[190px] items-center justify-center border-l border-line lg:flex [@media(pointer:coarse)]:hidden">
        <Cursor />
      </div>
    </header>
  );
}
