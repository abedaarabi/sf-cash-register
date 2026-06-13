export function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL?.trim();

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set. Add it in Netlify/Dokploy environment variables."
    );
  }

  return databaseUrl;
}

export function getDatabaseHost(): string | null {
  try {
    return new URL(getDatabaseUrl()).hostname;
  } catch {
    return null;
  }
}
