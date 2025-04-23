import { z } from 'zod';

function isValidTerm(term: string): boolean {
  const [semester, year, ...rest] = term.split(' ');

  if (rest && rest.length > 0) {
    return false;
  }

  // we use 'as string' here to ensure typescript doesnt try and convert semester to a literal
  if (semester !== ('Spring' as string) && semester !== ('Fall' as string)) {
    return false;
  }

  if (Number.isNaN(year)) {
    return false;
  }

  return true;
}

export const zTerm = z.string().refine(isValidTerm);

export type Term = z.infer<typeof zTerm>;

export default zTerm;
