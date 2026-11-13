import { ArrowUpRight, Briefcase, MapPin, Mail } from 'lucide-react';
import type { OpenRoleI } from '@/interfaces/content.interface';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

interface OpenRolesSectionProps {
  roles: OpenRoleI[];
  empty: { title: string; body: string };
  email: string;
  labels: { heading: string; sendCv: string };
}

function cvMailto(email: string, roleTitle?: string): string {
  const subject = roleTitle ? `CV: ${roleTitle}` : 'CV';
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

export function OpenRolesSection({ roles, empty, email, labels }: OpenRolesSectionProps) {
  return (
    <section className="bg-card py-[var(--space-2xl)]">
      <Container className="flex flex-col gap-[var(--space-lg)]">
        <h2 className="text-[length:var(--text-3xl)] font-bold">{labels.heading}</h2>
        {roles.length === 0 ? (
          <div className="flex flex-col items-start gap-[var(--space-sm)] rounded-md border border-dashed border-border bg-background p-[var(--space-lg)]">
            <span aria-hidden className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Mail className="size-5" />
            </span>
            <h3 className="text-[length:var(--text-xl)] font-bold">{empty.title}</h3>
            <p className="max-w-[65ch] text-muted-foreground">{empty.body}</p>
            <Button href={cvMailto(email)} size="lg">
              {labels.sendCv}
            </Button>
          </div>
        ) : (
          <ul className="flex flex-col gap-[var(--space-sm)]">
            {roles.map((role) => (
              <li key={role.title} className="flex flex-col gap-[var(--space-xs)] rounded-md border border-border bg-background p-[var(--space-md)] sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 flex-col gap-[var(--space-2xs)]">
                  <h3 className="text-[length:var(--text-xl)] font-bold">{role.title}</h3>
                  <p className="flex flex-wrap gap-x-[var(--space-sm)] gap-y-1 text-[length:var(--text-sm)] text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MapPin aria-hidden className="size-4" />
                      {role.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Briefcase aria-hidden className="size-4" />
                      {role.type}
                    </span>
                  </p>
                  <p className="max-w-[65ch]">{role.summary}</p>
                </div>
                <Button href={cvMailto(email, role.title)} variant="outline" aria-label={`${labels.sendCv}: ${role.title}`}>
                  {labels.sendCv}
                  <ArrowUpRight aria-hidden />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
