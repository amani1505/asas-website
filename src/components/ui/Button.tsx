'use client';

import Link from 'next/link';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn.util';

export const buttonVariants = cva(
  'group/button inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.1em] [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-foreground text-background hover:bg-foreground/85',
        outline: 'border border-border bg-transparent text-foreground hover:border-foreground/40 hover:bg-muted',
        ghost: 'bg-transparent text-foreground hover:bg-muted',
      },
      size: {
        sm: 'min-h-10 px-3 text-[length:var(--text-sm)]',
        md: 'min-h-11 px-[var(--space-sm)] text-[length:var(--text-sm)]',
        lg: 'min-h-12 px-[var(--space-md)] text-[length:var(--text-base)]',
        icon: 'size-11',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'>, ButtonVariantProps {
  /** Renders a Next.js link instead of a button. */
  href?: string;
  /** Extra attributes for links to other sites. */
  target?: string;
  rel?: string;
  hrefLang?: string;
  children?: ReactNode;
}

const MotionLink = motion.create(Link);
const PRESS = { scale: 0.97 };
const PRESS_SPRING = { type: 'spring', stiffness: 500, damping: 30 } as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, className, href, target, rel, hrefLang, children, type = 'button', ...props },
  ref,
) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    return (
      <MotionLink
        href={href}
        target={target}
        rel={rel}
        hrefLang={hrefLang}
        className={classes}
        whileTap={PRESS}
        transition={PRESS_SPRING}
        {...(props as Record<string, unknown>)}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button ref={ref} type={type} className={classes} whileTap={PRESS} transition={PRESS_SPRING} {...props}>
      {children}
    </motion.button>
  );
});
