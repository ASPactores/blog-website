"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useApi } from "@/hooks/use-api";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton"; // Import ShadCN Skeleton component

interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
}

interface PaginatedResponse {
  items: BlogPost[];
  total: number;
  page: number;
  size: number;
}

export default function BlogMainPage() {
  const { callAPI, error } = useApi();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(4);
  const pageSize = 6;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await callAPI<undefined, PaginatedResponse>(
          `/blog/posts?limit=${pageSize}&offset=${(page - 1) * pageSize}`,
          "GET"
        );
        setPosts(res.items);
        setTotalPages(Math.ceil(res.total / pageSize));
      } catch (e) {
        console.error("Failed to load blog posts:", e);
      }
    }

    fetchData();
  }, [callAPI, page]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex justify-end mb-4">
        <Link
          href="/admin"
          className="text-sm text-muted-foreground hover:text-primary underline transition-colors"
        >
          Admin Login
        </Link>
      </div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Blog articles
        </h1>
        <p className="text-muted-foreground text-lg">
          This website contains articles about a variety of topics, including
          Tech, Health, and Lifestyle.
        </p>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length === 0
          ? Array.from({ length: pageSize }).map((_, index) => (
              <div key={index} className="w-full">
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <Skeleton className="w-24 h-4 mb-2" />
                    <Skeleton className="w-48 h-6" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 mb-2" />
                    <Skeleton className="h-4 mb-2" />
                  </CardContent>
                  <CardFooter className="text-xs text-muted-foreground pt-0">
                    <Skeleton className="h-4 w-16" />
                  </CardFooter>
                </Card>
              </div>
            ))
          : posts.map((post) => {
              const description = post.content.slice(0, 160);

              return (
                <Link
                  href={`/article/${post.id}`}
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
                        {description}
                        {post.content.length > 160 && "..."}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="text-xs text-muted-foreground pt-0">
                      <span>
                        <span>
                          {moment(post.created_at).format("MMM D, YYYY")}
                        </span>
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              );
            })}
      </div>

      <Pagination className="mt-10 ">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          <PaginationItem>
            <span className="text-sm px-4">{`Page ${page} of ${totalPages}`}</span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className={
                page === totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
