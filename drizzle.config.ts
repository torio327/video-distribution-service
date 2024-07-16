import {config} from "dotenv";
import {defineConfig} from "drizzle-kit";
import exp from "node:constants";

config({path:'.env'});

export default defineConfig({
    schemaFilter:["public"],
    schema:'./db/schema.ts',
    out:'./supabase/migrations',
    dialect:'postgresql',
    dbCredentials:{
        url:process.env.DATABASE_URL!
    }
})

