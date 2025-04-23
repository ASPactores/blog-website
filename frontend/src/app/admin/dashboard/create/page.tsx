import { BlogForm } from "@/components/new-article-form";
import AdminLayout from "@/components/admin-layout";

export default function NewBlogPage() {
  return (
    <AdminLayout>
      <div className="container mx-auto py-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-3xl font-bold">Create New Blog Post</h1>
          <BlogForm />
        </div>
      </div>
    </AdminLayout>
  );
}
