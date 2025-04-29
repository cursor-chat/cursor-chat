import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    workspace: [
      // you can use a list of glob patterns to define your workspaces
      // Vitest expects a list of config files
      // or directories where there is a config file
      "packages/*",
      "tests/*/vitest.config.{e2e,unit}.ts",
      // you can even run the same tests,
      // but with different configs in the same "vitest" process
      {
        extends: true,
        test: {
          name: "happy-dom",
          environment: "happy-dom",
        },
      },
    ],
  },
});
