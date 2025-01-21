import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { env } from "@/env";

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_APIKEY,
  authDomain: env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: env.NEXT_PUBLIC_PROJECTID,
  storageBucket: env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: env.NEXT_PUBLIC_APPID,
  measurementId: env.NEXT_PUBLIC_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
