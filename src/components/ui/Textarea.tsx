import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils/cn.util';
import { fieldClasses } from './Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, invalid, rows = 5, ...props },
  ref,
) {
  return (
    <textarea ref={ref} rows={rows} aria-invalid={invalid || undefined} className={cn(fieldClasses, 'resize-y', className)} {...props} />
  );
});
