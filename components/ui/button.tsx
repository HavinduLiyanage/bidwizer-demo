import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const styles = cva('btn', {
  variants: {
    variant: {
      primary: 'btn-primary',
      ghost: 'btn-ghost',
      outline: 'border border-border text-ink bg-white hover:bg-slate-50',
      link: 'text-primary underline-offset-4 hover:underline bg-transparent',
      destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500'
    },
    size: { sm: 'px-4 py-2 text-xs', md: '', lg: 'px-6 py-3.5 text-base' }
  },
  defaultVariants: { variant: 'primary', size: 'md' }
})

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof styles> & {
    asChild?: boolean
  }

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(styles({ variant, size }), className)} {...props} />
}
