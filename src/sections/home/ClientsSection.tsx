import Image from 'next/image';
import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { ClientI } from '@/interfaces/content.interface';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Marquee } from '@/components/motion/Marquee';

interface ClientsSectionProps {
  clients: ClientI[];
  dict: DictionaryI;
}

export function ClientsSection({ clients, dict }: ClientsSectionProps) {
  const logos = clients.map((client) => (
    <div key={client.name} className="flex h-20 w-36 items-center justify-center rounded-md border border-border bg-white px-4 sm:w-44">
      <Image
        src={client.logo.src}
        alt={client.name}
        width={client.logo.width}
        height={client.logo.height}
        className="max-h-12 w-auto object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
      />
    </div>
  ));

  return (
    <section className="py-[var(--space-xl)]">
      <Container className="mb-[var(--space-md)] flex flex-col gap-2">
        <Eyebrow>{dict.home.clientsEyebrow}</Eyebrow>
        <h2 className="text-[length:var(--text-2xl)] font-bold">{dict.home.clientsTitle}</h2>
      </Container>
      <Marquee label={dict.home.clientsTitle} items={logos} speedSeconds={45} className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]" />
    </section>
  );
}
