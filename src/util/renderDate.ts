const FIRST_TWO_DIGIT_NUMBER = 10;

export function renderDate(providedDate: string): string {
  const date = new Date(providedDate);

  const year = date.getFullYear();
  const shortMonth = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  const dayPadded = day < FIRST_TWO_DIGIT_NUMBER ? `0${day}` : day;

  return `${year} ${shortMonth} ${dayPadded}`;
}
