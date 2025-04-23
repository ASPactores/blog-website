"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Define the form schema with zod
const formSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .max(100, {
      message: "Title must not exceed 100 characters.",
    }),
  content: z
    .string()
    .min(50, {
      message: "Content must be at least 50 characters.",
    })
    .max(5000, {
      message: "Content must not exceed 5000 characters.",
    }),
  category: z.string({
    required_error: "Please select a category.",
  }),
});

// Blog categories
const categories = [
  { id: "technology", name: "Technology" },
  { id: "health", name: "Health & Wellness" },
  { id: "finance", name: "Finance" },
  { id: "lifestyle", name: "Lifestyle" },
  { id: "travel", name: "Travel" },
  { id: "food", name: "Food & Cooking" },
  { id: "business", name: "Business" },
  { id: "education", name: "Education" },
];

export function BlogForm({
  onSubmit,
}: {
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
}) {
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
    },
  });
  function handleSubmit(values: z.infer<typeof formSchema>) {
    if (onSubmit) {
      onSubmit(values);
    } else {
      toast("Blog post created!", {
        description: (
          <span style={{ color: "black" }}>
            Your blog post has been created successfully.
          </span>
        ),
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your blog title" {...field} />
              </FormControl>
              <FormDescription>
                Create a compelling title for your blog post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your blog content here..."
                  className="min-h-[200px] resize-y"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Write the main content of your blog post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the category that best fits your blog post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create Blog Post</Button>
      </form>
    </Form>
  );
}
