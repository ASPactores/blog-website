"use client";
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
import { Pagination } from "@/components/paginated-table";
import AdminLayout from "@/components/admin-layout";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const categories = [
    { id: 1, name: "update cat", description: "update" },
    {
      id: 2,
      name: "eum",
      description:
        "Quis illum qui consequatur facilis. Eum nulla debitis beatissimus...",
    },
    {
      id: 3,
      name: "est",
      description: "Error ducimus ad ut veritatis sed laboriosam voluptatem...",
    },
    {
      id: 4,
      name: "recusandae",
      description:
        "Dolores dolores voluptas sit facilis impedit qui ea at. Qu...",
    },
    {
      id: 5,
      name: "odio",
      description: "Impedit provident amet debitis rerum. Minus eaque dol...",
    },
    {
      id: 6,
      name: "quasi",
      description:
        "Consectetur optio rem nam nulla nisi sint impedit hic. Ill...",
    },
    {
      id: 7,
      name: "sunt",
      description: "In praesentium sit est voluptatem recusandae. Laborum ...",
    },
    {
      id: 8,
      name: "est",
      description: "Earum magnam aut cum asperiores earum et aut. Ipsam...",
    },
    {
      id: 9,
      name: "eum",
      description:
        "Quis illum qui consequatur facilis. Eum nulla debitis beatissimus...",
    },
    {
      id: 10,
      name: "est",
      description: "Error ducimus ad ut veritatis sed laboriosam voluptatem...",
    },
    {
      id: 11,
      name: "recusandae",
      description:
        "Dolores dolores voluptas sit facilis impedit qui ea at. Qu...",
    },
    {
      id: 12,
      name: "odio",
      description: "Impedit provident amet debitis rerum. Minus eaque dol...",
    },
    {
      id: 13,
      name: "quasi",
      description:
        "Consectetur optio rem nam nulla nisi sint impedit hic. Ill...",
    },
    {
      id: 14,
      name: "sunt",
      description: "In praesentium sit est voluptatem recusandae. Laborum ...",
    },
    {
      id: 15,
      name: "est",
      description: "Earum magnam aut cum asperiores earum et aut. Ipsam...",
    },
    {
      id: 16,
      name: "eum",
      description:
        "Quis illum qui consequatur facilis. Eum nulla debitis beatissimus...",
    },
    {
      id: 17,
      name: "est",
      description: "Error ducimus ad ut veritatis sed laboriosam voluptatem...",
    },
    {
      id: 18,
      name: "recusandae",
      description:
        "Dolores dolores voluptas sit facilis impedit qui ea at. Qu...",
    },
    {
      id: 19,
      name: "odio",
      description: "Impedit provident amet debitis rerum. Minus eaque dol...",
    },
    {
      id: 20,
      name: "quasi",
      description:
        "Consectetur optio rem nam nulla nisi sint impedit hic. Ill...",
    },
    {
      id: 21,
      name: "sunt",
      description: "In praesentium sit est voluptatem recusandae. Laborum ...",
    },
    {
      id: 22,
      name: "est",
      description: "Earum magnam aut cum asperiores earum et aut. Ipsam...",
    },
  ];
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
      <div className="w-full overflow-auto border rounded-md">
        <div className="min-w-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  NAME
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  DESCRIPTION
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
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {category.description}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-primary"
                    >
                      <Trash2Icon className="h-5 w-5" />
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-primary"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="mt-4 px-2">
        <Pagination totalItems={22} itemsPerPage={15} />
      </div>
    </AdminLayout>
  );
}
