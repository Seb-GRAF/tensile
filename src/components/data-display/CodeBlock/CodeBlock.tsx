import { Fragment } from "react";
import { Highlight, type PrismTheme } from "prism-react-renderer";
import { CopyButton } from "../../actions/CopyButton/CopyButton";
import { Card } from "../../layout/Card/Card";

export type CodeBlockProps = {
  code: string;
  language?: string;
  /** A filename or caption shown above the code. */
  title?: string;
  /** Names the scrolling code region. */
  label?: string;
  copyLabel?: string;
  copiedLabel?: string;
  className?: string;
};

const syntaxTheme: PrismTheme = {
  plain: { color: "var(--tn-color-ink)" },
  styles: [
    { types: ["comment", "prolog", "doctype"], style: { color: "var(--tn-color-muted)" } },
    { types: ["keyword", "builtin"], style: { color: "#c4b5fd" } },
    { types: ["string", "attr-value"], style: { color: "#b8f23e" } },
    { types: ["function", "tag", "selector"], style: { color: "#7dd3fc" } },
    { types: ["attr-name", "property", "class-name"], style: { color: "#fde68a" } },
    { types: ["number", "boolean", "constant"], style: { color: "#fdba74" } },
  ],
};

export function CodeBlock({ code, language = "tsx", title, label = "Code", copyLabel = "Copy code", copiedLabel = "Copied", className = "" }: CodeBlockProps) {
  return (
    <Card tone="ink" className={`tn:flex tn:flex-col tn:overflow-hidden ${className}`}>
      <div className="tn:flex tn:items-center tn:justify-between tn:gap-4 tn:px-5 tn:pt-3">
        <span className="tn:truncate tn:text-label tn:text-muted">{title}</span>
        <CopyButton value={code} label={copyLabel} copiedLabel={copiedLabel} className="tn:shrink-0" />
      </div>
      <div className="tn:flex tn:min-h-0 tn:flex-col tn:rounded-card tn:-outline-offset-4 tn:has-focus-visible:outline-2 tn:has-focus-visible:outline-focus">
        <pre tabIndex={0} role="region" aria-label={label} className="tn:scroll-fade-x tn:min-h-0 tn:overflow-auto tn:px-5 tn:pt-2 tn:pb-6 tn:font-mono tn:text-label tn:leading-6 tn:outline-none">
          <Highlight code={code} language={language} theme={syntaxTheme}>
            {({ tokens, getTokenProps }) => (
              <code>
                {tokens.map((line, index) => (
                  <Fragment key={index}>
                    {index > 0 && "\n"}
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })}>{token.empty ? "" : token.content}</span>
                    ))}
                  </Fragment>
                ))}
              </code>
            )}
          </Highlight>
        </pre>
      </div>
    </Card>
  );
}
