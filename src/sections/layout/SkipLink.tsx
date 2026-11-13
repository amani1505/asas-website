export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      className="sr-only rounded-md bg-primary px-4 py-3 font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200]"
    >
      {label}
    </a>
  );
}
