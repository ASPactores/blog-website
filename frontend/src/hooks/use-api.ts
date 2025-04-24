"use client";

import { useState, useCallback } from "react";
import { getCookie, setCookie } from "@/actions/cookies";
import { useRouter } from "next/navigation";

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const callAPI = useCallback(
    async <TBody, TResponse = unknown>(
      url: string,
      method: string,
      body?: TBody,
      headers?: HeadersInit,
      authenticated: boolean = false,
      redirectOnAuthFailure: boolean = true
    ): Promise<TResponse> => {
      setLoading(true);
      setError(null);

      try {
        const accessToken = await getCookie("access_token");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}${url}`,
          {
            method: method,
            headers: {
              "Content-Type": "application/json",
              ...(authenticated &&
                accessToken && { Authorization: `Bearer ${accessToken}` }),
              ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
          }
        );

        if (response.status === 401) {
          try {
            const refreshToken = await getCookie("refresh_token");

            if (!refreshToken) {
              if (redirectOnAuthFailure) {
                router.push("/admin");
              }
              throw new Error("No refresh token available");
            }

            const refreshResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  refresh_token: refreshToken,
                }),
              }
            );

            if (refreshResponse.ok) {
              const refreshData = await refreshResponse.json();

              await setCookie(
                "access_token",
                refreshData.access_token,
                refreshData.access_token_expiry
              );

              const newResponse = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}${url}`,
                {
                  method: method,
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${refreshData.access_token}`,
                    ...headers,
                  },
                  body: body ? JSON.stringify(body) : undefined,
                }
              );

              if (newResponse.ok) {
                if (
                  newResponse.headers
                    .get("content-type")
                    ?.includes("application/json")
                ) {
                  return await newResponse.json();
                } else {
                  return newResponse as unknown as TResponse;
                }
              } else {
                throw new Error(`API error: ${newResponse.status}`);
              }
            } else {
              if (redirectOnAuthFailure) {
                router.push("/admin");
              }
              throw new Error("Invalid refresh token");
            }
          } catch (refreshError) {
            if (redirectOnAuthFailure) {
              router.push("/admin");
            } else if (refreshError instanceof Error) {
              throw new Error(refreshError.message);
            }
          }
        }

        if (response.ok) {
          if (
            response.headers.get("content-type")?.includes("application/json")
          ) {
            return await response.json();
          } else {
            return response as unknown as TResponse;
          }
        } else {
          throw new Error(`API error: ${response.status}`);
        }
      } catch (e) {
        console.error("API call failed:", e);
        setError(e instanceof Error ? e.message : "An unknown error occurred");
        throw new Error(
          e instanceof Error ? e.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  return { callAPI, loading, error };
}
