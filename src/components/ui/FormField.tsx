'use client';

import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export interface FieldControlPropsI {
  id: string;
  'aria-describedby'?: string;
  invalid: boolean;
}

interface FormFieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: (control: FieldControlPropsI) => ReactNode;
}

const ERROR_TRANSITION = { duration: 0.2, ease: [0.22, 1, 0.36, 1] } as const;

/** Label, control, optional hint and an animated error linked through aria-describedby. */
export function FormField({ id, label, hint, error, children }: FormFieldProps) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="flex flex-col gap-[var(--space-3xs)]">
      <label htmlFor={id} className="text-[length:var(--text-sm)] font-medium">
        {label}
        {hint && (
          <span id={hintId} className="ml-2 font-normal text-muted-foreground">
            {hint}
          </span>
        )}
      </label>
      {children({ id, 'aria-describedby': describedBy, invalid: Boolean(error) })}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            key="error"
            id={errorId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={ERROR_TRANSITION}
            className="overflow-hidden text-[length:var(--text-sm)] font-medium text-primary"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
