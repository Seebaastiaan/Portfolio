import { personalInfo, socialLinks } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-cocoa-ink bg-canvas-parchment">
      <div className="mx-auto max-w-[1440px] px-8 py-10 lg:px-12">
        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow opacity-70">
              © {year} {personalInfo.name}
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-center">
            <p className="eyebrow opacity-50">All rights reserved</p>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 md:justify-end">
              <li>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-dashed eyebrow"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-dashed eyebrow"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href={socialLinks.email} className="link-dashed eyebrow">
                  Email
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-dashed eyebrow"
                >
                  Résumé
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
