"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Pagination } from "@/components/table-pagination";
import AdminLayout from "@/components/admin-layout";
import { useApi } from "@/hooks/use-api";
import { Post } from "@/lib/types";
import BlogTable from "@/components/blog-table";

const ITEMS_PER_PAGE = 15;

export default function Dashboard() {
  const { callAPI } = useApi();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchPosts = async (page: number) => {
    const limit = ITEMS_PER_PAGE;
    const offset = (page - 1) * limit;

    try {
      const data = await callAPI<null, { items: Post[]; total: number }>(
        `/blog/self/posts?limit=${limit}&offset=${offset}`,
        "GET",
        undefined,
        undefined,
        true // authenticated
      );

      setPosts(data.items);
      setTotalItems(data.total);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <AdminLayout>
      <div className="mb-6 px-2">
        <Button
          variant="outline"
          className="flex items-center gap-2 text-primary"
          onClick={() => router.push("/admin/dashboard/create")}
        >
          <PlusIcon className="h-4 w-4" />
          <span>Create New Article</span>
        </Button>
      </div>
      <BlogTable posts={posts} />
      <div className="mt-4 px-2">
        <Pagination
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>
    </AdminLayout>
  );
}
