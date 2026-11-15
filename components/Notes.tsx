import { personalInfo, principles } from "@/lib/data";
import { Split, Zone } from "./Zone";

export default function Notes() {
  return (
    <Zone id="notes" letter="C" label="Notes">
      <Split
        side={
          <dl className="anno">
            <div className="border-b border-line pb-4">
              <dt className="text-ink-soft">Based</dt>
              <dd className="mt-1">{personalInfo.location}</dd>
            </div>
            <div className="border-b border-line py-4">
              <dt className="text-ink-soft">Working</dt>
              <dd className="mt-1">{personalInfo.availability}</dd>
            </div>
            <div className="py-4">
              <dt className="text-ink-soft">Status</dt>
              <dd className="mt-1 inline-flex items-center gap-2.5">
                <span aria-hidden className="h-1.5 w-1.5 bg-accent" />
                {personalInfo.status}
              </dd>
            </div>
          </dl>
        }
      >
        <h2 className="anno font-medium">General notes</h2>
        <p className="lead mt-8 max-w-[30ch]">{personalInfo.bio}</p>

        <ol className="mt-14 grid gap-px border-t border-line md:grid-cols-3 lg:mt-20">
          {principles.map((principle, i) => (
            <li
              key={principle.title}
              className="border-b border-line py-6 md:border-b-0 md:border-l md:py-0 md:pl-6 md:pt-6 md:first:border-l-0 md:first:pl-0 md:pr-6"
            >
              <p className="anno text-ink-soft">
                Note {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-[19px] font-medium leading-[1.2] tracking-[-0.01em]">
                {principle.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">
                {principle.body}
              </p>
            </li>
          ))}
        </ol>
      </Split>
    </Zone>
  );
}
