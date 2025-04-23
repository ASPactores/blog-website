import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BlogForm, Post } from "./new-article-form";

export function EditBlogDialogContent(data: Post) {
  return (
    <DialogContent className="sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Edit Blog</DialogTitle>
      </DialogHeader>
      <BlogForm {...data} />
    </DialogContent>
  );
}
