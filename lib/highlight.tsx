import { Fragment, type ReactNode } from "react";

// Tiny syntax highlighter for the JS-like snippets on the site.
const TOKEN =
  /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(const|let|var|function|return|export|default|await|async|import|from|new|if|else|true|false|null)\b|\b(\d+(?:\.\d+)?)\b|([A-Za-z_$][\w$]*)(?=\s*\()|([A-Za-z_$][\w$]*)(?=\s*:)|([{}()[\];,.=:<>+\-*/!?$#@%|&])/g;

const cls = {
  comment: "text-slate-500 italic",
  string: "text-emerald-300",
  keyword: "text-violet-400",
  number: "text-amber-300",
  fn: "text-cyan-300",
  prop: "text-sky-300",
  punct: "text-slate-400",
};

export function highlightLine(line: string): ReactNode {
  const parts: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  let i = 0;
  while ((m = TOKEN.exec(line))) {
    if (m.index > last) parts.push(<Fragment key={i++}>{line.slice(last, m.index)}</Fragment>);
    const [text, comment, str, kw, num, fn, prop] = m;
    const c = comment
      ? cls.comment
      : str
        ? cls.string
        : kw
          ? cls.keyword
          : num
            ? cls.number
            : fn
              ? cls.fn
              : prop
                ? cls.prop
                : cls.punct;
    parts.push(
      <span key={i++} className={c}>
        {text}
      </span>,
    );
    last = m.index + text.length;
    if (text.length === 0) TOKEN.lastIndex++;
  }
  if (last < line.length) parts.push(<Fragment key={i++}>{line.slice(last)}</Fragment>);
  return parts;
}
