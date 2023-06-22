import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:8080",
  },

  component: {
    devServer: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      framework: 'cypress-ct-aurelia',
      bundler: "webpack",
    }
  }
});
