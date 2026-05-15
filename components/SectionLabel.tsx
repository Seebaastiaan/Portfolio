interface SectionLabelProps {
  index: string;
  label: string;
}

export default function SectionLabel({ index, label }: SectionLabelProps) {
  return (
    <div className="eyebrow flex items-center gap-3">
      <span className="text-cocoa-ink">({index})</span>
      <span aria-hidden className="h-px w-10 bg-cocoa-ink/40" />
      <span className="text-cocoa-ink">{label}</span>
    </div>
  );
}
