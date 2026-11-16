/** A mailto link for sending a CV, naming the role or area in the subject when given. */
export function cvMailto(email: string, about?: string): string {
  const subject = about ? `CV: ${about}` : 'CV';
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
