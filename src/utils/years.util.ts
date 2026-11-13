/** Whole calendar years between `year` and `now`. */
export function yearsSince(year: number, now: Date): number {
  return now.getFullYear() - year;
}
