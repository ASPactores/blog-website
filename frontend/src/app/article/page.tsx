"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BlogPost({ params }: { params: { slug: string } }) {
  // Placeholder blog post data
  const post = {
    title: "Blog Post Title",
    category: "Blog articles",
    author: "Jane Doe",
    date: "Jan 1, 2023",
    readTime: "5 min read",
    content: `
      This is where the full blog post content would go. In a real application,
      this would be fetched from your data source based on the slug parameter.


      You can format this content with Markdown or HTML, and render it using a
      library like react-markdown or similar to display full formatting.
    `,
  };

  const paragraphs = post.content
    .trim()
    .split("\n\n")
    .filter((paragraph) => paragraph.trim() !== "");

  return (
    <div className="mx-auto py-10 bg-gray-100 min-h-screen px-4">
      <div className="max-w-3xl mx-auto mb-6">
        <Link href="/" className="inline-block">
          <Button variant="ghost" className="gap-2">
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
              {post.date} • {post.readTime}
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

// "use client";

// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// export default function ArticlePage() {
//   const sampleData = {
//     id: 1,
//     title: "Sample Article",
//     author: "John Doe",
//     category: "Technology",
//     content: `
//       This is a sample article content. It can be a blog post, news article, or any other type of content. The content can be long and detailed, providing information, insights, or entertainment to the readers.

//       You can format the content using Markdown or HTML, depending on your requirements. This allows you to include headings, paragraphs, lists, images, and other elements to enhance the readability and presentation of the article.

//       Hello 123
//     `,
//   };

//   const paragraphs = sampleData.content
//     .trim()
//     .split("\n\n")
//     .filter((paragraph) => paragraph.trim() !== "");

//   return (
//     <div className="mx-auto py-10 bg-gray-100 min-h-screen">
//       <Card className="mx-auto max-w-3xl shadow-md">
//         <CardHeader className="space-y-4">
//           <div className="flex items-center justify-between">
//             <Badge variant="secondary" className="text-sm">
//               {sampleData.category}
//             </Badge>
//           </div>
//           <h1 className="text-3xl font-bold tracking-tight">
//             {sampleData.title}
//           </h1>
//           <p className="text-gray-500">By {sampleData.author}</p>
//           <Separator />
//         </CardHeader>
//         <CardContent className="prose prose-gray max-w-none">
//           {paragraphs.map((paragraph, index) => (
//             <p key={index} className="mb-4 leading-relaxed text-gray-700">
//               {paragraph.trim()}
//             </p>
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
