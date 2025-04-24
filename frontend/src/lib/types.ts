export interface Post {
  id?: string;
  title?: string;
  content?: string;
  category?: string;
  created_at?: string;
}

export interface PaginatedResponse {
  items: Post[];
  total: number;
  page: number;
  size: number;
}

export interface BlogPost {
  id: number;
  category: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  slug: string;
}

export interface BlogCardProps {
  post: BlogPost;
}

export interface TablePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}
