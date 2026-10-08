const DEFAULT_DATABASE_NAME = "veggiecrush";

function getMongoDatabaseName(uri) {
  if (!uri) return "";

  try {
    return decodeURIComponent(new URL(uri).pathname.replace(/^\/+/, "").replace(/\/+$/, ""));
  } catch {
    throw new Error("The configured MongoDB URI is invalid.");
  }
}

export function getPrismaDatabaseUrl(databaseUrl, environment = process.env) {
  if (typeof databaseUrl !== "string" || !databaseUrl.trim()) {
    throw new Error("DATABASE_URL must be configured.");
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(databaseUrl);
  } catch {
    throw new Error("DATABASE_URL must be a valid MongoDB connection string.");
  }

  if (parsedUrl.protocol !== "mongodb:" && parsedUrl.protocol !== "mongodb+srv:") {
    throw new Error("DATABASE_URL must use mongodb:// or mongodb+srv://.");
  }

  if (parsedUrl.pathname.replace(/^\/+|\/+$/g, "")) {
    return databaseUrl;
  }

  const databaseName = environment.DATABASE_NAME?.trim()
    || getMongoDatabaseName(environment.MONGO_URI)
    || DEFAULT_DATABASE_NAME;

  if (!databaseName || /[/\\?#\u0000-\u001f]/.test(databaseName)) {
    throw new Error("DATABASE_NAME must be a valid MongoDB database name.");
  }

  parsedUrl.pathname = `/${databaseName}`;
  return parsedUrl.toString();
}
