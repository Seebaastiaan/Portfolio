interface ZoneProps {
  id: string;
  /** Zone letter printed in the sheet margin, as on a real drawing. */
  letter: string;
  label: string;
  children: React.ReactNode;
}

/** One horizontal band of the sheet: a margin rail plus its content. */
export function Zone({ id, letter, label, children }: ZoneProps) {
  return (
    <section
      id={id}
      aria-label={label}
      className="grid border-t border-line lg:grid-cols-[44px_minmax(0,1fr)]"
    >
      <div aria-hidden className="hidden border-r border-line lg:block">
        <div className="anno sticky top-[var(--header-h)] flex flex-col items-center gap-4 py-5">
          <span className="font-medium">{letter}</span>
          <span className="text-ink-soft [writing-mode:vertical-rl]">
            {label}
          </span>
        </div>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

interface SplitProps {
  children: React.ReactNode;
  side: React.ReactNode;
  className?: string;
}

/** Drawing on the left, annotations on the right. */
export function Split({ children, side, className = "" }: SplitProps) {
  return (
    <div
      className={`grid lg:grid-cols-[minmax(0,1fr)_340px] ${className}`}
    >
      <div className="min-w-0 px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="@container">{children}</div>
      </div>
      <aside className="min-w-0 border-t border-line px-5 py-10 sm:px-8 lg:border-l lg:border-t-0 lg:py-16">
        {side}
      </aside>
    </div>
  );
}
