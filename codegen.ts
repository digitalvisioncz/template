import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/shopify/schema/2025-04.graphql",
  documents: ["./src/shopify/**/*.graphql"],
  generates: {
    "./src/lib/shopify/generated/index.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        {
          "typescript-react-apollo": {
            addHooksExport: true,
            withComponent: false,
            withHoc: false,
          },
        },
      ],
    },
  },
};

export default config;
