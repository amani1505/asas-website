import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn.util';

export const fieldClasses =
  'w-full rounded-md border border-border bg-card px-3 py-2.5 text-[length:var(--text-base)] text-foreground placeholder:text-muted-foreground/70 transition-[border-color,box-shadow] duration-200 outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/15 focus-visible:outline-none aria-[invalid=true]:border-primary aria-[invalid=true]:ring-4 aria-[invalid=true]:ring-primary/10';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, invalid, ...props }, ref) {
  return <input ref={ref} aria-invalid={invalid || undefined} className={cn(fieldClasses, 'min-h-11', className)} {...props} />;
});
