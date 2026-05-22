import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-extrabold uppercase tracking-wide brut-border brut-shadow brut-hover focus:outline-none focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0",
  {
    variants: {
      variant: {
        default:    "bg-brut-ink text-white",
        primary:    "bg-brut-cyan text-brut-ink",
        secondary:  "bg-brut-yellow text-brut-ink",
        pink:       "bg-brut-pink text-brut-ink",
        lime:       "bg-brut-lime text-brut-ink",
        orange:     "bg-brut-orange text-brut-ink",
        violet:     "bg-brut-violet text-brut-ink",
        outline:    "bg-white text-brut-ink",
        destructive:"bg-brut-red text-white",
        ghost:      "border-transparent shadow-none text-brut-ink hover:bg-brut-yellow",
        link:       "border-transparent shadow-none text-brut-ink underline underline-offset-4",
      },
      size: {
        default: "h-11 px-5 py-2 text-sm",
        sm:      "h-9 px-3 text-xs",
        lg:      "h-12 px-7 text-base",
        xl:      "h-14 px-8 text-lg",
        icon:    "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
