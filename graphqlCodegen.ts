import { codegen } from "@graphql-codegen/core";
import * as schemaAstPlugin from "@graphql-codegen/schema-ast";
import * as typescriptPlugin from "@graphql-codegen/typescript";
import * as typescriptResolversPlugin from "@graphql-codegen/typescript-resolvers";
import * as fs from "fs";
import { parse, printSchema } from "graphql";
import "graphql-import-node";
import path from "path";
import { schema } from "./src/gqlDefinition";

const run = async () => {
  const parsedSchema = parse(printSchema(schema));
  const config = {
    filename: "graphql.ts",
    schema: parsedSchema,
    documents: [],
    plugins: [
      { typescript: {} },
      {
        typescriptResolvers: {
          noSchemaStitching: true,
          wrapFieldDefinitions: false,
          contextType: "Context",
          defaultMapper: "Partial<{T}>",
        },
      },
    ],
    pluginMap: {
      typescript: typescriptPlugin,
      typescriptResolvers: typescriptResolversPlugin,
    },
    config: { wrapFieldDefinitions: false },
  };

  const output = await codegen(config);

  fs.writeFileSync(path.join(__dirname, "./src/generated/graphql.ts"), output);

  fs.writeFileSync(
    path.join(__dirname, "./src/generated/schema.graphql"),
    await codegen({
      filename: "schema.graphql",
      schema: parsedSchema,
      documents: [],
      plugins: [{ schemaAst: { includeDirectives: true } }],
      pluginMap: {
        schemaAst: schemaAstPlugin,
      },
      config: { wrapFieldDefinitions: false },
    })
  );
  console.log("🚀 Graphql code generated 🚀");
  process.exit(0);
};

run();
