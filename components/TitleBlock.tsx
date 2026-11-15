import { personalInfo, sheet, socialLinks } from "@/lib/data";
import { Split, Zone } from "./Zone";

const links = [
  { label: "LinkedIn", href: socialLinks.linkedin },
  { label: "GitHub", href: socialLinks.github },
  { label: "Résumé", href: socialLinks.resume },
];

function Cell({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-3 py-2.5 ${className}`}>
      <dt className="text-[9px] text-ink-soft">{label}</dt>
      <dd className="mt-0.5">{children}</dd>
    </div>
  );
}

/** Contact, set as the title block in the corner of the sheet. */
export default function TitleBlock() {
  const year = new Date().getFullYear();

  return (
    <Zone id="contact" letter="D" label="Title block">
      <Split
        side={
          <dl className="anno grid grid-cols-3 border border-ink bg-paper [&>div]:border-ink">
            <Cell label="Drawn by" className="col-span-1 border-b border-r">
              S. Jara
            </Cell>
            <Cell label="Title" className="col-span-2 border-b">
              Portfolio — {personalInfo.role}
            </Cell>
            <Cell label="Date" className="border-b border-r">
              {year}
            </Cell>
            <Cell label="Scale" className="border-b border-r">
              {sheet.scale}
            </Cell>
            <Cell label="Sheet" className="border-b">
              01 / 01
            </Cell>
            <Cell label="Dwg no." className="col-span-2 border-r">
              {sheet.number}
            </Cell>
            <Cell label="Rev.">{year}</Cell>
          </dl>
        }
      >
        <div className="flex flex-wrap items-start justify-between gap-6">
          <h2 className="anno font-medium">Contact</h2>
          <p className="anno stamp mr-2 font-medium">
            Available
            <br />
            for hire — {year}
          </p>
        </div>

        <p className="lead mt-10 max-w-[24ch]">
          Have something that needs to be built precisely? Send the brief.
        </p>

        <a
          href={socialLinks.email}
          className="link wide mt-10 block w-fit whitespace-nowrap text-[clamp(15px,6.3cqi,48px)] font-light leading-[1.15] tracking-[-0.025em]"
        >
          {personalInfo.email}
        </a>

        <ul className="anno mt-10 flex flex-wrap gap-3">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                {link.label} <span aria-hidden>↗</span>
              </a>
            </li>
          ))}
        </ul>
      </Split>

      <footer className="anno flex flex-wrap justify-between gap-x-8 gap-y-1 border-t border-line px-5 py-4 text-ink-soft sm:px-8 lg:px-12">
        <span>
          © {year} {personalInfo.name}
        </span>
        <span>All dimensions in pixels unless otherwise noted</span>
      </footer>
    </Zone>
  );
}
