"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusIcon, Trash2Icon, PencilIcon } from "lucide-react";
import { Pagination } from "@/components/table-pagination";
import AdminLayout from "@/components/admin-layout";
import { useApi } from "@/hooks/use-api";
import moment from "moment";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { EditBlogDialogContent } from "@/components/update-blog-form";
import { DeleteBlogDialog } from "@/components/delete-dialog";

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
}

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
        `/blog/posts?limit=${limit}&offset=${offset}`,
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs font-medium text-muted-foreground">
              PUBLISHED DATE
            </TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground">
              TITLE
            </TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground">
              CATEGORY
            </TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground w-24 text-center">
              DELETE
            </TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground w-24 text-center">
              MODIFY
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="text-muted-foreground">
                {moment(post.created_at).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell className="text-muted-foreground">
                {post.category}
              </TableCell>
              <TableCell className="text-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-primary"
                    >
                      <Trash2Icon className="h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                  <DeleteBlogDialog id={post.id} />
                </Dialog>
              </TableCell>
              <TableCell className="text-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-primary"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                  <EditBlogDialogContent {...post} />
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
