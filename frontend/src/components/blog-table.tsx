import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Trash2Icon, PencilIcon } from "lucide-react";
import moment from "moment";
import { DeleteBlogDialog } from "./delete-dialog";
import { Button } from "./ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import { EditBlogDialogContent } from "./update-blog-form";
import { Post } from "@/lib/types";

export default function BlogTable({ posts }: { posts: Post[] }) {
  return (
    <>
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
    </>
  );
}
