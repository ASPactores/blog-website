"use client";
import React from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { NotebookPen, AlignLeft, LogOut } from "lucide-react";

export default function AppSidebar() {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Blogs</SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="py-1 px-2 text-sm rounded hover:bg-gray-100 cursor-pointer flex items-center">
            <NotebookPen className="h-4 w-4 mr-2" />
            My Blogs
          </div>
          <div className="py-1 px-2 text-sm rounded hover:bg-gray-100 cursor-pointer flex items-center">
            <AlignLeft className="h-4 w-4 mr-2" />
            All Blogs
          </div>
          <div className="py-1 px-2 text-sm rounded bg-red-50 hover:bg-gray-100 cursor-pointer flex items-center">
            <LogOut className="h-4 w-4 mr-2" color="red" />
            Sign Out
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
