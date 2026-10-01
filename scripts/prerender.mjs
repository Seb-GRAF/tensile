import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { build } from "vite";

const { homepage, description } = JSON.parse(readFileSync("package.json", "utf8"));

await build({ configFile: "site/vite.config.ts", logLevel: "warn", build: { ssr: "server.tsx", outDir: "../site-ssr", emptyOutDir: true } });
const { render, docsPages, titleOf } = await import("../site-ssr/server.js");
const template = readFileSync("site-dist/index.html", "utf8");

for (const page of [undefined, ...docsPages]) {
  const url = page ? new URL(`docs/${page.id}/`, homepage).href : homepage;
  const title = titleOf(page);
  const text = page ? page.description : description;
  const head = `  <title>${title}</title>
    <meta name="description" content="${text}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Tensile" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${text}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${homepage}og.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
  </head>`;
  const dir = page ? `site-dist/docs/${page.id}` : "site-dist";
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/index.html`, template.replace("</head>", head).replace('<div id="root"></div>', `<div id="root">${render(url)}</div>`));
}

const groups = Object.groupBy(docsPages, (page) => page.group);
const link = (page) => `- [${page.title}](${new URL(`docs/${page.id}/`, homepage).href}): ${page.description}`;
writeFileSync("site-dist/llms.txt", `# Tensile

> ${description}

${Object.entries(groups).map(([group, pages]) => `## ${group}\n\n${pages.map(link).join("\n")}\n`).join("\n")}`);

const components = docsPages.filter((page) => page.documentation);
writeFileSync("site-dist/llms-full.txt", `# Tensile

> ${description}

${components.map((page) => `## ${page.title}

${page.description}

${page.documentation.usage}

### Props

${page.props.map((prop) => `- \`${prop.prop}\`${prop.required ? " (required)" : ""}: \`${prop.type}\`${prop.default === "—" ? "" : `, default \`${prop.default}\``}. ${prop.description}`).join("\n")}
${page.documentation.keyboard.length > 0 ? `
### Keyboard

${page.documentation.keyboard.map((row) => `- ${row.key}: ${row.description}`).join("\n")}
` : ""}`).join("\n")}`);

rmSync("site-ssr", { recursive: true });
console.log(`Pre-rendered ${docsPages.length + 1} pages.`);
