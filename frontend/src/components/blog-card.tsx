import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface BlogPost {
  id: number;
  category: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  slug: string;
}

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <Card className="h-full transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <Badge variant="outline" className="w-fit mb-2">
            {post.category}
          </Badge>
          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm text-muted-foreground line-clamp-3">
            {post.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground pt-0">
          <div className="flex items-center gap-2">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
