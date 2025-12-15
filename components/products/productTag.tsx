import { cn } from '@/lib/utils'
import React from 'react'

const ProductTag = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({className, ...props}, ref) => (
  <span
    ref={ref}
    className={
      // cn("inline-block text-sm bg-[#A57C76] px-3 py-2 rounded-md text-[#F9F6F3] m-2", className)
      cn("inline-block text-sm border border-[#A57C76] px-3 py-2 rounded-xl text-[#A57C76] m-2", className)
    }
    {...props}
  />
))
ProductTag.displayName = "ProductTag"

export {ProductTag}
