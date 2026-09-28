import { readFileSync, writeFileSync } from "node:fs";
import ts from "typescript";

const index = JSON.parse(readFileSync("storybook-static/index.json", "utf8"));
const entries = Object.values(index.entries).filter((entry) => entry.type === "story" && entry.importPath.startsWith("./src/components/"));
const groups = Object.groupBy(entries, (entry) => entry.title);
const configFile = ts.readConfigFile("tsconfig.json", ts.sys.readFile);
const config = ts.parseJsonConfigFileContent(configFile.config, ts.sys, ".");
const program = ts.createProgram(config.fileNames, config.options);
const checker = program.getTypeChecker();
const api = {};

for (const [title, stories] of Object.entries(groups)) {
  const first = stories[0];
  const name = title.split("/").at(-1);
  const path = first.componentPath ?? first.importPath.replace(".stories.tsx", ".tsx");
  const file = program.getSourceFile(path);
  const component = file.statements.find((statement) => ts.isFunctionDeclaration(statement) && statement.name.text === name);
  const parameter = component.parameters[0];
  const defaults = Object.fromEntries(
    parameter.name.elements
      .filter((element) => element.initializer)
      .map((element) => [element.name.text, element.initializer.getText(file)]),
  );
  const props = checker.getTypeAtLocation(parameter).getProperties();
  const storyFile = program.getSourceFile(first.importPath);
  const exports = checker.getExportsOfModule(checker.getSymbolAtLocation(storyFile));

  api[name] = {
    id: name.toLowerCase(),
    title: name,
    group: title.split("/")[0],
    description: ts.displayPartsToString(checker.getSymbolAtLocation(component.name).getDocumentationComment(checker)),
    source: storyFile.text,
    stories: stories.map((story) => ({
      id: story.id,
      name: story.name,
      description: ts.displayPartsToString(exports.find((symbol) => symbol.name === story.exportName).getDocumentationComment(checker)),
    })),
    props: props
      .filter((prop) => prop.declarations.some((declaration) => !declaration.getSourceFile().fileName.includes("node_modules")) || prop.name in defaults)
      .map((prop) => ({
        prop: prop.name,
        type: checker.typeToString(checker.getTypeOfSymbolAtLocation(prop, component), undefined, ts.TypeFormatFlags.NoTruncation),
        required: !(prop.flags & ts.SymbolFlags.Optional),
        default: defaults[prop.name] ?? "—",
      })),
  };
}

writeFileSync("site/docs/api.json", `${JSON.stringify(api, null, 2)}\n`);
console.log(`Generated ${Object.keys(api).length} component pages from ${entries.length} Storybook stories.`);
