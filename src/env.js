import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    CONVEX_DEPLOYMENT: z.string(),
    AUTHORIZED_ADMIN: z.string(),
  },
  client: {
    NEXT_PUBLIC_CONVEX_URL: z.string().url(),
    NEXT_PUBLIC_APIKEY: z.string(),
    NEXT_PUBLIC_AUTHDOMAIN: z.string(),
    NEXT_PUBLIC_PROJECTID: z.string(),
    NEXT_PUBLIC_STORAGEBUCKET: z.string(),
    NEXT_PUBLIC_MESSAGINGSENDERID: z.string(),
    NEXT_PUBLIC_APPID: z.string(),
    NEXT_PUBLIC_MEASUREMENTID: z.string(),
  },
  shared: {
    NODE_ENV: z.enum(["development", "test", "staging", "production"]),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    ////CONVEX
    CONVEX_DEPLOYMENT: process.env.CONVEX_DEPLOYMENT,
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    ////FIREBASE
    NEXT_PUBLIC_APIKEY: process.env.NEXT_PUBLIC_APIKEY,
    NEXT_PUBLIC_AUTHDOMAIN: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    NEXT_PUBLIC_PROJECTID: process.env.NEXT_PUBLIC_PROJECTID,
    NEXT_PUBLIC_STORAGEBUCKET: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    NEXT_PUBLIC_MESSAGINGSENDERID: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    NEXT_PUBLIC_APPID: process.env.NEXT_PUBLIC_APPID,
    NEXT_PUBLIC_MEASUREMENTID: process.env.NEXT_PUBLIC_MEASUREMENTID,
    ////AUTHORIZED
    AUTHORIZED_ADMIN: process.env.AUTHORIZED_ADMIN,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  emptyStringAsUndefined: true,
});
