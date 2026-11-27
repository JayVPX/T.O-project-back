// import { Pool } from "pg";

import { Pool } from "pg";

// const config = {
//   host: process.env.POST_HOST,
//   port: Number(process.env.POST_PORT) || 5432,
//   user: process.env.POST_USER,
//   password: process.env.POST_PASSWORD,
//   database: process.env.POST_DATABASE,
// };

// export const PostgresClient = new Pool(config);

const config = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
  },
};

export const PostgresClient = new Pool(config);
