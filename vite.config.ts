import { defineConfig } from "vite";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";

const inlineCss = (): Plugin => ({
  name: "inline-critical-css",
  enforce: "post",
  generateBundle(_, bundle) {
    const html = bundle["index.html"];
    const cssEntry = Object.entries(bundle).find(([fileName]) =>
      fileName.endsWith(".css"),
    );
    if (!html || html.type !== "asset" || !cssEntry) return;

    const [fileName, css] = cssEntry;
    if (css.type !== "asset") return;
    html.source = String(html.source).replace(
      new RegExp(`<link rel="stylesheet" crossorigin href="[^"]*${fileName}">`),
      `<style>${String(css.source)}</style>`,
    );
    delete bundle[fileName];
  },
});

export default defineConfig({
  plugins: [react(), inlineCss()],
  base: "/AQ-50/",
  server: {
    port: 3000,
  },
});
