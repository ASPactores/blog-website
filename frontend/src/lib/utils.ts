import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to calculate the read time based on content length
export const calculateReadTime = (content: string): string => {
  const words = content.split(/\s+/).length;
  const wordsPerMinute = 250;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};
