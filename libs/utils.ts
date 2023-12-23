let options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "2-digit",
  day: "numeric",
};

export function dateFormatTr(date: string): string {
  return new Intl.DateTimeFormat("tr", options).format(new Date(date));
}
