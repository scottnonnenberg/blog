const charR = /\w/;

export function prune(input: string, limit: number): string {
  const text = input.trim().replace(/\n/g, ' ').replace(/ {2,}/g, ' ');

  if (text.length <= limit) {
    return text;
  }

  const index = limit - 3;
  for (let i = index; i >= 1; i -= 1) {
    const current = text[i];
    const next = text[i - 1];

    if (next === undefined || current === undefined) {
      continue;
    }

    if (charR.test(next) && !charR.test(current)) {
      return `${text.slice(0, i)}...`;
    }
  }

  return `${text.slice(0, limit - 3)}...`;
}
