"use client";

import { cn } from "@/lib/utils";

interface RecentlyViewedProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt?: string;
}

export default function RecentlyViewedPostImage({ src, alt, className, ...props }: RecentlyViewedProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("object-cover shadow-lg", className)}
    />
  );
}