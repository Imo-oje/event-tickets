const getEnv = (
  key: string | number,
  defaultValue?: string | number
): string | number => {
  const value = process.env[key] || defaultValue;
  if (value === undefined)
    throw new Error(`Missing environment variable ${key}`);

  return value;
};

export const MONGO_URI = getEnv("MONGO_URI") as string;
export const PORT = getEnv("PORT", 3000) as number;
export const JWT_SECRET = getEnv("JWT_SECRET") as string;
