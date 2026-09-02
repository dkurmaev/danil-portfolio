type ClassValue = string | false | null | undefined;

/** Joins truthy class-name fragments with a space. No conflict resolution — call sites are expected not to pass overlapping utilities. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}
