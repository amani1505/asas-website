import type { ImageI } from '@/interfaces/content.interface';

/** The same image with Swahili alt text. */
export const sw = (image: ImageI, alt: string): ImageI => ({ ...image, alt });
