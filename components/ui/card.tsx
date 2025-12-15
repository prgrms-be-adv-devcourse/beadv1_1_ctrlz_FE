import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'

const Card = React.forwardRef<
  HTMLDivElement,
   React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    ref={ref}
    className={
      cn(
        "rounded-xl border bg-card text-card-foreground shadow gap-3 p-1",
        "min-w-36 sm:min-w-40 md:min-w-48 lg:w-56 lg:min-w-48 hover:cursor-pointer", 
        className
      )
    }
    {...props}
   /> 
))
Card.displayName = "Card"


const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center ", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

interface CardUserImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
}

const CardUserImage = React.forwardRef<HTMLImageElement, CardUserImageProps>(
  ({ className, ...props }, ref) => (
    <img
      ref={ref}
      className={cn("w-8 h-8 rounded-full object-cover", className)}
      {...props}
    />
  )
)
CardUserImage.displayName = "CardUserImage"

const CardUserNickname = React.forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(({className, ...props}, ref) => (
  <span
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardUserNickname.displayName = "CardUserNickname"

const CardUser = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
))
CardUser.displayName = "CardUser"


interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  ratio?: "1:1" | "4:5" | "16:9"
}

const aspectMap = {
  "1:1": "aspect-square",
  "4:5": "aspect-[4/5]",
  "16:9": "aspect-video"
}

const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>(
  ({ className, ratio = "1:1", ...props }, ref) => (
    <div
      className={cn(
        aspectMap[ratio],
        "w-32 h-32 min-w-32",
        "sm:w-32 sm:h-32 sm:min-w-32",
        "md:w-48 md:h-48 md:min-w-48",
        "lg:w-56 lg:h-56 lg:min-w-40 lg:min-h-40",
        "overflow-hidden rounded-xl",
        className
      )}
    >
      <img
        ref={ref}
        className={cn("w-full h-full object-cover", className)}
        {...props}
      />
    </div>
  )
)
CardImage.displayName = "CardImage"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    ref={ref}
    className={cn("items-center gap-2", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-md leading-none tracking-tight mt-3", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardPrice = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-md font-semibold text-muted-foreground mt-1", className)}
    {...props}
  />
))
CardPrice.displayName = "CardPrice"

const CardDate = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <span 
    ref={ref}
    className={cn("text-sm text-muted-foreground text-gray-500", className)}
    {...props}
  />
))
CardDate.displayName = "CardDate"


export { Card, CardHeader, CardUser, CardUserImage, CardUserNickname,CardImage, CardDescription, CardTitle, CardPrice, CardDate }