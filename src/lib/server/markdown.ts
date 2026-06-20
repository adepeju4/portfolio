import { Marked } from "marked";
import { createHighlighter, type Highlighter } from "shiki";
import DOMPurify from "isomorphic-dompurify";

const THEME = "dark-plus";

const LANGS = [
  "javascript",
  "typescript",
  "jsx",
  "tsx",
  "svelte",
  "html",
  "css",
  "scss",
  "json",
  "bash",
  "python",
  "go",
  "rust",
  "sql",
  "yaml",
  "markdown",
  "php",
  "java",
  "c",
  "cpp",
  "csharp",
  "ruby",
  "diff",
  "docker",
  "graphql",
];

let highlighterPromise: Promise<Highlighter> | null = null;
function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({ themes: [THEME], langs: LANGS });
  }
  return highlighterPromise;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Parse a fenced-code info string into a language + optional filename.
 *  Supports: ```ts  /  ```ts:app.ts  /  ```ts title="app.ts" */
function parseInfo(info: string) {
  const trimmed = (info || "").trim();
  let filename = "";

  const titleMatch = trimmed.match(/(?:title|file)="([^"]+)"/);
  if (titleMatch) filename = titleMatch[1];

  const first = trimmed.split(/\s+/)[0] ?? "";
  let lang = first;
  if (first.includes(":")) {
    const [l, f] = first.split(":");
    lang = l;
    if (!filename && f) filename = f;
  }

  return { lang: lang || "text", filename };
}

function wrapWindow(codeHtml: string, lang: string, filename: string) {
  const label = filename || (lang && lang !== "text" ? lang : "");
  return (
    `<div class="code-window">` +
    `<div class="code-window__bar">` +
    `<span class="code-window__dots"><span></span><span></span><span></span></span>` +
    (label ? `<span class="code-window__name">${escapeHtml(label)}</span>` : "") +
    `</div>` +
    `<div class="code-window__body">${codeHtml}</div>` +
    `</div>`
  );
}

/** Render blog markdown to sanitized HTML with VSCode-style highlighted code blocks. */
export async function renderMarkdown(md: string): Promise<string> {
  if (!md) return "";

  const highlighter = await getHighlighter();
  const instance = new Marked();

  instance.use({
    walkTokens(token) {
      if (token.type !== "code") return;
      const { lang, filename } = parseInfo((token as { lang?: string }).lang ?? "");
      let codeHtml: string;
      try {
        codeHtml = highlighter.codeToHtml(token.text, { lang, theme: THEME });
      } catch {
        codeHtml = highlighter.codeToHtml(token.text, { lang: "text", theme: THEME });
      }
      (token as { __wrapped?: string }).__wrapped = wrapWindow(codeHtml, lang, filename);
    },
    renderer: {
      code(token) {
        const wrapped = (token as { __wrapped?: string }).__wrapped;
        return wrapped ?? `<pre><code>${escapeHtml(token.text)}</code></pre>`;
      },
    },
  });

  const html = instance.parse(md) as string;
  return DOMPurify.sanitize(html);
}
