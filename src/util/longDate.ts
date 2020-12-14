export function longDate(providedDate: string): string {
  const date = new Date(providedDate);

  const year = date.getFullYear();
  const shortMonth = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  const dayPadded = day < 10 ? `0${day}` : day;

  return `${year} ${shortMonth} ${dayPadded}`;
}
