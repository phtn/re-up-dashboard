"use server";

import { cookies } from "next/headers";
import { Mode } from "./types";

const defaultOpts = {
  secure: false,
  httpOnly: true,
  sameSite: "lax" as const,
};

export const setThemeState = async (theme: Mode) => {
  const cookieStore = await cookies();
  cookieStore.set("re-up-command--mode", theme, { ...defaultOpts, path: "/" });
  return `mode set to ${theme}`;
};

export const getTheme = async () => {
  const cookieStore = await cookies();
  const light = "light";
  const mode = cookieStore.get("re-up-command--mode")?.value as Mode;
  return mode ?? light;
};

export const deleteThemes = async () => {
  const cookieStore = await cookies();
  return cookieStore.delete("re-up-command--mode");
};

export const setUID = async (uid: string) => {
  const cookieStore = await cookies();
  cookieStore.set("re-up-command--uid", uid, { ...defaultOpts, path: "/" });
  return `mode set to ${uid}`;
};

export const getUID = async () => {
  const cookieStore = await cookies();
  const light = "light";
  const mode = cookieStore.get("re-up-command--uid")?.value;
  return mode ?? light;
};

export const deleteUID = async () => {
  const cookieStore = await cookies();
  return cookieStore.delete("re-up-command--uid");
};
