import * as dotenv from 'dotenv';
// import type { Config } from 'drizzle-kit';
import { defineConfig } from "drizzle-kit"

dotenv.config();
const { USER_DATABASE_URL } = process.env;

if (!USER_DATABASE_URL) {
	throw new Error(
		'No USER_DATABASE_URL defined in the environment variables. Please ensure it is set in the .env file.'
	);
}

export default defineConfig({
    dialect: "sqlite",
	schema: 'src/lib/user-database/schema.ts',
	out: './drizzleMigrations',
	dbCredentials: {
		url: process.env.USER_DATABASE_URL!
	}
});
// DEPRECATED AFTER UPDATING TO drizzle-kit 0.23, IF YOU MUST downgrade then use this:
// import * as dotenv from 'dotenv';
// import type { Config } from 'drizzle-kit';

// dotenv.config();
// const { USER_DATABASE_URL } = process.env;

// if (!USER_DATABASE_URL) {
// 	throw new Error(
// 		'No USER_DATABASE_URL defined in the environment variables. Please ensure it is set in the .env file.'
// 	);
// }

// export default {
// 	schema: 'src/lib/user-database/schema.ts',
// 	out: './drizzleMigrations',
// 	driver: 'better-sqlite',
// 	dbCredentials: {
// 		url: USER_DATABASE_URL
// 	}
// } satisfies Config;