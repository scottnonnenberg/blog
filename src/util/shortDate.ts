export function shortDate(providedDate: string, providedNow?: string): string {
  const date = new Date(providedDate);
  const now = providedNow ? new Date(providedNow) : new Date();

  const currentYear = now.getFullYear();
  const year = date.getFullYear();

  const shortMonth = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  const dayPadded = day < 10 ? `0${day}` : day;

  if (currentYear === year) {
    return `${shortMonth} ${dayPadded}`;
  }

  return `${year} ${shortMonth} ${dayPadded}`;
}
