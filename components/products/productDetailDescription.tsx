import { cn } from "@/lib/utils"
import React from "react"

const ProductDetailDescription = React.forwardRef<
  HTMLDivElement,
   React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    ref={ref}
    className={
      cn(
        "w-full h-auto sm:w-64 sm:h-auto md:w-96 lg:w-md max-w-3xl",
        className
      )
    }
    {...props}
   /> 
))
ProductDetailDescription.displayName = "ProductDetailDescription"

const ProductDetailTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadElement>
>(({className, ...props}, ref) => (
  <p
    ref={ref}
    className={
      cn("text-2xl font-semibold text-[#2E2B2F]", className)
    }
    {...props}
  />
))
ProductDetailTitle.displayName = "ProductDetailTitle"

const ProductDetailSpan = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({className, ...props}, ref) => (
  <span
    ref={ref}
    className={
      cn("inline-block text-sm", className)
    }
    {...props}
  />
))
ProductDetailSpan.displayName = "ProductDetailSpan"

const ProductDetailPrice = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadElement>
>(({className, ...props}, ref) => (
  <p
    ref={ref}
    className={
      cn("text-xl font-semibold text-[#2E2B2F]", className)
    }
    {...props}
  />
))
ProductDetailPrice.displayName = "ProductDetailPrice"


export {ProductDetailDescription, ProductDetailTitle, ProductDetailSpan, ProductDetailPrice}