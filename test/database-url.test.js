import test from "node:test";
import assert from "node:assert/strict";
import { getPrismaDatabaseUrl } from "../src/lib/database-url.js";

test("preserves a database name already present in DATABASE_URL", () => {
  const databaseUrl = "mongodb+srv://user:pass@cluster.example/production?retryWrites=true";

  assert.equal(
    getPrismaDatabaseUrl(databaseUrl, { DATABASE_NAME: "other", MONGO_URI: "mongodb://host/catalog" }),
    databaseUrl,
  );
});

test("uses DATABASE_NAME when DATABASE_URL has an empty path", () => {
  const result = new URL(getPrismaDatabaseUrl(
    "mongodb+srv://user:pass@cluster.example/?retryWrites=true",
    { DATABASE_NAME: "production", MONGO_URI: "mongodb://host/catalog" },
  ));

  assert.equal(result.pathname, "/production");
  assert.equal(result.search, "?retryWrites=true");
});

test("uses MONGO_URI database name when DATABASE_NAME is not set", () => {
  const result = new URL(getPrismaDatabaseUrl(
    "mongodb://user:pass@host/",
    { MONGO_URI: "mongodb+srv://user:pass@cluster.example/catalog?retryWrites=true" },
  ));

  assert.equal(result.pathname, "/catalog");
});

test("defaults an empty MongoDB URI path to the catalog database", () => {
  const result = new URL(getPrismaDatabaseUrl("mongodb://user:pass@host/"));

  assert.equal(result.pathname, "/veggiecrush");
});

test("rejects invalid and non-MongoDB datasource URLs", () => {
  assert.throws(
    () => getPrismaDatabaseUrl("not a URL"),
    { message: "DATABASE_URL must be a valid MongoDB connection string." },
  );
  assert.throws(
    () => getPrismaDatabaseUrl("postgresql://host/database"),
    { message: "DATABASE_URL must use mongodb:// or mongodb+srv://." },
  );
});
