import { cn } from "@/lib/utils"
import React from "react"

const Sectiontitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("text-lg text-[#2E2B2F] font-semibold leading-none tracking-tight m-2", className)}
    {...props}
  />
))
Sectiontitle.displayName = "Sectiontitle"

export {Sectiontitle}