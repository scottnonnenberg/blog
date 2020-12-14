const charR = /\w/;

export function prune(input: string, limit: number): string {
  const text = input.trim().replace(/\n/g, ' ').replace(/ {2,}/g, ' ');

  if (text.length <= limit) {
    return text;
  }

  const index = limit - 3;
  for (let i = index; i >= 1; i -= 1) {
    if (charR.test(text[i - 1]) && !charR.test(text[i])) {
      return `${text.slice(0, i)}...`;
    }
  }

  return `${text.slice(0, limit - 3)}...`;
}
