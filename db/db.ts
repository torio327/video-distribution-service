import 'dotenv/config'

import postgres from "postgres";
import {drizzle} from "drizzle-orm/postgres-js";
import * as schema from "./schema"

const connectionString=process.env.DATABASE_URL as string

 const client =postgres(connectionString,{prepare:false})
 // const db=drizzle(client,{schema});
const db=drizzle(client,{schema});

export default db;
