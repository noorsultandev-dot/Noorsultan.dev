import { highlightLine } from "@/lib/highlight";

/** Syntax-highlighted code with line numbers. */
export default function CodeBlock({
  lines,
  activeLine,
  caret = false,
  startAt = 1,
  className = "",
  minLines = 0,
}: {
  lines: string[];
  activeLine?: number;
  caret?: boolean;
  startAt?: number;
  className?: string;
  minLines?: number;
}) {
  const padded = lines.length < minLines ? lines.concat(Array(minLines - lines.length).fill("")) : lines;
  return (
    <pre className={`font-mono text-[12.5px] leading-6 sm:text-[13.5px] ${className}`}>
      <code>
        {padded.map((l, i) => (
          <div
            key={i}
            className={`flex ${activeLine === i ? "bg-cyan-400/[0.06]" : ""}`}
          >
            <span className="w-9 shrink-0 select-none pr-3 text-right text-slate-600">{i + startAt}</span>
            <span className="whitespace-pre-wrap break-words text-slate-200">
              {highlightLine(l)}
              {caret && activeLine === i && <span className="caret !bg-cyan-300" />}
            </span>
          </div>
        ))}
      </code>
    </pre>
  );
}
