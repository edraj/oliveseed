import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import("@sveltejs/kit").Config} */
const config = {
  preprocess: [vitePreprocess()],
  kit: {
    alias: {
      "shut": process.cwd() + "/node_modules/shut/src",
      "$src": process.cwd() + ("/src"),
      "$utils": process.cwd() + ("/src/utils"),
      "$core": process.cwd() + ("/src/core")
    },
    adapter: adapter({
      pages: "host/build",
      assets: "host/build",
      fallback: "index.html"
    }),
    files: {
      hooks: {
        client: "src/core/hooks.client",
        server: "src/core/hooks.server",
        universal: "src/core/hooks",
      },
      appTemplate: process.env.NODE_ENV === "development" ? "src/app.html" : "src/placeholder.html"
    }
  },
  onwarn: (warning, handler) => {
    if (warning.code.includes("a11y")) return;
    handler(warning);
  },
  extensions: [".svelte"],

};

export default config;
