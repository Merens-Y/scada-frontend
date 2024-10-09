import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

async function main() {
  const client = createClient({ url: process.env.DB_FILE_NAME! });
  const db = drizzle(client);
}

main();