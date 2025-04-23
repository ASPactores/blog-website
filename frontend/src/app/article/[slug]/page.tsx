import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import moment from "moment";

type BlogPost = {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  created_at: string;
};

// Function to calculate the read time based on content length
const calculateReadTime = (content: string): string => {
  const words = content.split(/\s+/).length;
  const wordsPerMinute = 250;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

const fetchPost = async (slug: string): Promise<BlogPost | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/posts/${slug}`
    );
    if (!response.ok) {
      throw new Error("Error fetching blog post");
    }
    const post = await response.json();
    return post;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
};

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = await fetchPost(slug);

  if (!post) {
    return <div>Error fetching blog post.</div>;
  }

  const paragraphs = post.content
    .trim()
    .split("\n\n")
    .filter((paragraph) => paragraph.trim() !== "");

  const readTime = calculateReadTime(post.content);

  return (
    <div className="mx-auto py-10 bg-gray-100 min-h-screen px-4">
      <div className="max-w-3xl mx-auto mb-6">
        <Link href="/" className="inline-block">
          <Button
            variant="ghost"
            className="gap-2 hover:bg-gray-200 hover:cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Button>
        </Link>
      </div>

      <Card className="mx-auto max-w-3xl shadow-md">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-sm">
              {post.category}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {moment(post.created_at).format("MMM D, YYYY")} • {readTime}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
          <p className="text-sm text-muted-foreground">By {post.author}</p>
          <Separator />
        </CardHeader>
        <CardContent className="prose prose-gray max-w-none">
          {paragraphs.map((para, index) => (
            <p key={index} className="leading-relaxed">
              {para.trim()}
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
