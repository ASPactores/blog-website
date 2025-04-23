import { BlogForm } from "@/components/new-article-form";
import AdminLayout from "@/components/admin-layout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NewBlogPage() {
  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto mb-6">
        <div className="container mx-auto py-10">
          <Link href="/admin/dashboard" className="inline-block">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-3xl font-bold">Create New Blog Post</h1>
          <BlogForm />
        </div>
      </div>
    </AdminLayout>
  );
}
