"use server";

import { cookies } from "next/headers";

export async function setCookie(key: string, value: string, maxAge: number) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: key,
    value: value,
    path: "/",
    sameSite: "lax",
    maxAge: maxAge,
  });
}

export async function getCookie(key: string) {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value;
}
