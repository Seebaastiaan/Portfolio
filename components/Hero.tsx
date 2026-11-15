import { personalInfo, socialLinks } from "@/lib/data";
import MatrixFigure from "./MatrixFigure";
import Measure from "./Measure";
import { Split, Zone } from "./Zone";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

export default function Hero() {
  const [first, last] = personalInfo.name.split(" ");

  return (
    <Zone id="top" letter="A" label="Cover">
      <Split
        side={
          <div className="land" style={delay(500)}>
            <MatrixFigure />
          </div>
        }
      >
        <div className="anno land flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
          <span className="text-ink-soft">Portfolio — General arrangement</span>
          <span className="inline-flex items-center gap-2.5">
            <span aria-hidden className="h-1.5 w-1.5 bg-accent" />
            {personalInfo.status}
          </span>
        </div>

        <div className="mt-16 lg:mt-24">
          <Measure fit>
            <h1 className="name land" style={delay(120)}>
              {first}
              <br />
              {last}
            </h1>
          </Measure>
        </div>

        <div
          aria-hidden
          className="draw-x mt-14 h-px bg-line lg:mt-20"
          style={delay(350)}
        />

        <div
          className="land mt-8 grid gap-x-10 gap-y-8 md:grid-cols-[200px_minmax(0,1fr)]"
          style={delay(450)}
        >
          <dl className="anno grid grid-cols-2 gap-6 md:grid-cols-1 md:content-start">
            <div>
              <dt className="text-ink-soft">Role</dt>
              <dd className="mt-1">{personalInfo.role}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Based</dt>
              <dd className="mt-1">{personalInfo.location}</dd>
              <dd className="text-ink-soft">{personalInfo.availability}</dd>
            </div>
          </dl>

          <div>
            <p className="lead max-w-[22ch]">{personalInfo.headline}</p>
            <p className="mt-4 max-w-[52ch] text-ink-soft">
              {personalInfo.subheadline}
            </p>
            <div className="anno mt-8 flex flex-wrap gap-3">
              <a href="#work" className="btn">
                View figures <span aria-hidden>↓</span>
              </a>
              <a
                href={socialLinks.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Résumé <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>
      </Split>
    </Zone>
  );
}
