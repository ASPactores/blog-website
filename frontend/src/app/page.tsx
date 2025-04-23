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

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      category: "Blog articles",
      title: "5 principles of an ideal SEO team structure",
      description:
        "There is a method to (re)structuring an SEO team. In this article, I explain the 5 guiding principles to...",
      date: "Oct 19, 2021",
      readTime: "4 min read",
      slug: "seo-team-structure",
    },
    {
      id: 2,
      category: "Blog articles",
      title: "My Growth predictions for 2021",
      description:
        "In this post, I review my predictions for 2020 and set new ones for 2021.",
      date: "Jan 4, 2021",
      readTime: "10 min read",
      slug: "growth-predictions-2021",
    },
    {
      id: 3,
      category: "serp features",
      title: "The impact of image SERP Features on traffic",
      description:
        "Image Boxes and Image Thumbnails are two of the most shown SERP Features. One of them drains a...",
      date: "Nov 16, 2020",
      readTime: "4 min read",
      slug: "image-serp-features-impact",
    },
    {
      id: 4,
      category: "Blog articles",
      title: "SEO Performance Tracking",
      description:
        "Learn how to effectively track and measure your SEO performance with these proven methods.",
      date: "Dec 5, 2021",
      readTime: "6 min read",
      slug: "seo-performance-tracking",
    },
    {
      id: 5,
      category: "Analytics",
      title: "Understanding Core Web Vitals",
      description:
        "A deep dive into Core Web Vitals and how they affect your website's performance and ranking.",
      date: "Feb 12, 2022",
      readTime: "8 min read",
      slug: "core-web-vitals",
    },
    {
      id: 6,
      category: "Tech",
      title: "The Future of JavaScript Frameworks",
      description:
        "Exploring the evolution and future directions of popular JavaScript frameworks in web development.",
      date: "Mar 30, 2022",
      readTime: "7 min read",
      slug: "javascript-frameworks-future",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Blog articles
        </h1>
        <p className="text-muted-foreground text-lg">
          Blog articles about SEO, Tech, leadership, and Growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.id}
            className="block group"
          >
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
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
