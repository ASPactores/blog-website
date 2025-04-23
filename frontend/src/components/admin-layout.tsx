"use client";
import React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";

export default function AdminLayout({
  children,
}: React.PropsWithChildren<object>) {
  return (
    <SidebarProvider>
      <div className="flex h-full w-full">
        <Sidebar>
          <SidebarContent>
            <AppSidebar />
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 p-4">
          <SidebarTrigger className="md:hidden mb-4" />
          <div className="w-full max-w-4xl mx-auto">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
