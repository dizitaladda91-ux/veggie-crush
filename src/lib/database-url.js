const DEFAULT_DATABASE_NAME = "veggiecrush";

function getMongoDatabaseName(uri) {
  if (!uri) return "";

  try {
    return decodeURIComponent(new URL(uri).pathname.replace(/^\/+/, "").replace(/\/+$/, ""));
  } catch {
    return DEFAULT_DATABASE_NAME;
  }
}

export function getPrismaDatabaseUrl(databaseUrl, environment = process.env) {
  const effectiveUrl = (typeof databaseUrl === "string" && databaseUrl.trim())
    ? databaseUrl.trim()
    : (environment.DATABASE_URL?.trim() || environment.MONGO_URI?.trim() || "mongodb://localhost:27017/veggiecrush");

  let parsedUrl;
  try {
    parsedUrl = new URL(effectiveUrl);
  } catch {
    return "mongodb://localhost:27017/veggiecrush";
  }

  if (parsedUrl.protocol !== "mongodb:" && parsedUrl.protocol !== "mongodb+srv:") {
    return "mongodb://localhost:27017/veggiecrush";
  }

  if (parsedUrl.pathname.replace(/^\/+|\/+$/g, "")) {
    return effectiveUrl;
  }

  const databaseName = environment.DATABASE_NAME?.trim()
    || getMongoDatabaseName(environment.MONGO_URI)
    || DEFAULT_DATABASE_NAME;

  parsedUrl.pathname = `/${databaseName}`;
  return parsedUrl.toString();
}
