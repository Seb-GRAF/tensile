import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { App } from "./App";

export { docsPages, titleOf } from "./Docs";

export function render(url: string) {
  return renderToString(<StrictMode><App url={url} /></StrictMode>);
}
