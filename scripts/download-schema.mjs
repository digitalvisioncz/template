import https from "node:https";

const SCHEMA_URL =
  process.env.SHOPIFY_SCHEMA_URL ||
  "https://your-store.myshopify.com/admin/api/2025-04/graphql.json";
const TOKEN = process.env.SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN;

if (!TOKEN) {
  console.error(
    "Missing SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN env var. Cannot download schema.",
  );
  process.exit(1);
}

const INTROSPECTION_QUERY = `
query IntrospectionQuery {
  __schema {
    types {
      kind
      name
      description
      fields(includeDeprecated: true) {
        name
        type {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
            }
          }
        }
        args {
          name
          type {
            kind
            name
            ofType {
              kind
              name
            }
          }
        }
      }
      inputFields {
        name
        type {
          kind
          name
          ofType {
            kind
            name
          }
        }
      }
      enumValues(includeDeprecated: true) {
        name
      }
    }
  }
}`;

function httpsRequest(url: string, token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const options = new URL(url);
    const req = https.request(options, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": token,
      },
    }, (res) => {
      let data = "";
      res.on("data", (chunk: string) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(new Error(`Invalid JSON response: ${data.slice(0, 200)}`));
        }
      });
    });
    req.on("error", reject);
    req.write(JSON.stringify({ query: INTROSPECTION_QUERY }));
    req.end();
  });
}

async function main() {
  console.log(`Downloading schema from ${SCHEMA_URL}...`);
  const result = await httpsRequest(SCHEMA_URL, TOKEN);

  if (result.errors) {
    console.error("GraphQL errors:", JSON.stringify(result.errors, null, 2));
    process.exit(1);
  }

  const schema = result.data?.__schema;
  if (!schema) {
    console.error("Unexpected response structure");
    process.exit(1);
  }

  const fs = await import("node:fs");
  const path = new URL("../src/shopify/schema/2025-04.graphql", import.meta.url);
  fs.mkdirSync(new URL(".", import.meta.url).pathname, { recursive: true });

  const lines: string[] = [];
  for (const t of schema.types) {
    if (t.name.startsWith("__")) continue;
    if (t.name === "UUID" || t.name === "DateTime") continue;

    lines.push(`# ${t.description || t.kind + " " + t.name}`);

    if (t.kind === "ENUM") {
      lines.push(`enum ${t.name} {`);
      for (const v of t.enumValues || []) {
        lines.push(`  ${v.name}`);
      }
      lines.push("}");
    } else if (t.kind === "INPUT_OBJECT") {
      lines.push(`input ${t.name} {`);
      for (const f of t.inputFields || []) {
        const typeName = printType(f.type);
        lines.push(`  ${f.name}: ${typeName}`);
      }
      lines.push("}");
    } else if (t.kind === "SCALAR") {
      lines.push(`scalar ${t.name}`);
    } else if (t.kind === "OBJECT" || t.kind === "INTERFACE") {
      lines.push(`type ${t.name} {`);
      for (const f of t.fields || []) {
        const args = (f.args || [])
          .map((a: any) => `${a.name}: ${printType(a.type)}`)
          .join(", ");
        const suffix = args ? `(${args})` : "";
        lines.push(`  ${f.name}${suffix}: ${printType(f.type)}`);
      }
      lines.push("}");
    }

    lines.push("");
  }

  fs.writeFileSync(path, lines.join("\n"));
  console.log(`Schema written to ${path.pathname}`);
}

function printType(type: any): string {
  if (!type) return "Unknown";
  if (type.kind === "NON_NULL") return `${printType(type.ofType)}!`;
  if (type.kind === "LIST") return `[${printType(type.ofType)}]`;
  return type.name || "Unknown";
}

main().catch((err) => {
  console.error("Failed to download schema:", err);
  process.exit(1);
});
