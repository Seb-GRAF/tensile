import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import ts from "typescript";

const configFile = ts.readConfigFile("tsconfig.json", ts.sys.readFile);
const config = ts.parseJsonConfigFileContent(configFile.config, ts.sys, ".");
const program = ts.createProgram(config.fileNames, config.options);
const checker = program.getTypeChecker();
const entry = program.getSourceFile("src/index.ts");
const groups = {
  actions: "Actions",
  inputs: "Inputs",
  navigation: "Navigation",
  feedback: "Feedback",
  "data-display": "Data display",
  layout: "Layout",
  overlays: "Overlays",
  media: "Media",
};
const api = {};

for (const statement of entry.statements) {
  const name = statement.exportClause.elements[0].name.text;
  const path = resolve("src", `${statement.moduleSpecifier.text}.tsx`);
  const file = program.getSourceFile(path);
  const component = file.statements.find((node) => ts.isFunctionDeclaration(node) && node.name.text === name);
  const parameter = component.parameters[0];
  const defaults = Object.fromEntries(
    parameter.name.elements
      .filter((element) => element.initializer)
      .map((element) => [element.name.text, element.initializer.getText(file)]),
  );
  const namedProps = parameter.name.elements.map((element) => element.name.text);
  const docs = program.getSourceFile(path.replace(/\.tsx$/, ".docs.ts"));
  const descriptions = docs
    ? Object.fromEntries(
      docs.statements.find(ts.isExportAssignment).expression.properties
        .find((property) => property.name.text === "props").initializer.properties
        .map((property) => [property.name.text, property.initializer.text]),
    )
    : {};
  const props = checker.getTypeAtLocation(parameter).getProperties();

  api[name] = {
    id: name.toLowerCase(),
    title: name,
    group: groups[statement.moduleSpecifier.text.split("/")[2]],
    description: ts.displayPartsToString(checker.getSymbolAtLocation(component.name).getDocumentationComment(checker)),
    props: props
      .filter((prop) => prop.declarations.some((declaration) => !declaration.getSourceFile().fileName.includes("node_modules")) || namedProps.includes(prop.name) || prop.name in descriptions)
      .map((prop) => ({
        prop: prop.name,
        type: checker.typeToString(checker.getTypeOfSymbolAtLocation(prop, component), undefined, ts.TypeFormatFlags.NoTruncation),
        required: !(prop.flags & ts.SymbolFlags.Optional),
        default: defaults[prop.name] ?? "—",
        description: descriptions[prop.name] ?? ts.displayPartsToString(prop.getDocumentationComment(checker)),
      })),
  };
}

writeFileSync("site/docs/api.json", `${JSON.stringify(api, null, 2)}\n`);
console.log(`Generated API references for ${Object.keys(api).length} components from TypeScript.`);
