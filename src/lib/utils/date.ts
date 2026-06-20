export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (!dateString || isNaN(date.getTime())) return "Draft";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  if (!dateString || isNaN(date.getTime())) return "Draft";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}
