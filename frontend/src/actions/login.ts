"use server";

import { cookies } from "next/headers";

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  uid: string;
  access_token_expiry: number;
}

export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const { access_token, refresh_token, uid, access_token_expiry } =
      (await response.json()) as LoginResponse;

    const cookieStore = await cookies();

    cookieStore.set({
      name: "access_token",
      value: access_token,
      path: "/",
      sameSite: "lax",
      maxAge: access_token_expiry,
      httpOnly: true,
    });

    cookieStore.set({
      name: "refresh_token",
      value: refresh_token,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
    });

    cookieStore.set({
      name: "uid",
      value: uid,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return { success: true };
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
