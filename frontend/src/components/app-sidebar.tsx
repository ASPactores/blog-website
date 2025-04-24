"use client";
import React from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { NotebookPen, AlignLeft, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/use-api";
import { getCookie, deleteCookie } from "@/actions/cookies";
import { toast } from "sonner";

export default function AppSidebar() {
  const router = useRouter();
  const { callAPI } = useApi();

  const handleSignOut = async () => {
    try {
      const accessToken = await getCookie("access_token");
      const refreshToken = await getCookie("refresh_token");
      const body = {
        access_token: accessToken,
        refresh_token: refreshToken,
      };

      await callAPI(
        "/auth/logout",
        "POST",
        body,
        {
          "Content-Type": "application/json",
        },
        false,
        false
      );

      await deleteCookie("access_token");
      await deleteCookie("refresh_token");
      await deleteCookie("uid");

      router.push("/admin");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out. Please try again.");
    }
  };

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Blogs</SidebarGroupLabel>
        <SidebarGroupContent>
          <div
            onClick={() => router.push("/admin/dashboard/my-blogs")}
            className="py-4 px-3 text-sm rounded bg-gray-200 hover:bg-gray-100 cursor-pointer flex items-center"
          >
            <NotebookPen className="h-4 w-4 mr-2" />
            My Blogs
          </div>
          <div
            onClick={() => router.push("/")}
            className="py-4 px-3 text-sm rounded hover:bg-gray-100 cursor-pointer flex items-center"
          >
            <AlignLeft className="h-4 w-4 mr-2" />
            All Blogs
          </div>
          <div
            onClick={handleSignOut}
            className="py-4 px-3 text-sm rounded hover:bg-gray-100 cursor-pointer flex items-center"
          >
            <LogOut className="h-4 w-4 mr-2" color="red" />
            Sign Out
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
