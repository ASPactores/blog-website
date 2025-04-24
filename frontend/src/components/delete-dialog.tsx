"use client";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useApi } from "@/hooks/use-api";
import { toast } from "sonner";

export function DeleteBlogDialog({ id = "" }: { id?: string }) {
  const { callAPI } = useApi();
  const handleDelete = async () => {
    try {
      if (!id) {
        toast.error("Blog ID is required to delete the blog.");
        return;
      }
      await callAPI(`/blog/delete/${id}`, "DELETE", undefined, undefined, true);
      toast.success("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog.");
    }
  };
  return (
    <DialogContent className="sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Delete Blog?</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this blog? This action cannot be
          undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={handleDelete} variant={"destructive"}>
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
