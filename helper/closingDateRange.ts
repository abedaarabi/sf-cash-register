/** closingDate is stored as YYYY-MM-DD text in MySQL — compare as strings, not Date. */
export function normalizeClosingDateParam(value?: string): string | undefined {
  if (value == null || value === "") return undefined;
  return String(value).trim();
}

export function isValidClosingDateRange(start?: string, end?: string): boolean {
  if (!start || !end) return false;
  return /^\d{4}-\d{2}-\d{2}$/.test(start) && /^\d{4}-\d{2}-\d{2}$/.test(end);
}

export function formatClosingDateLocal(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Default dashboard window: today and the previous six days (7 days inclusive). */
export function getDefaultClosingDateRange(days = 7): {
  startDate: string;
  endDate: string;
} {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - (days - 1));
  return {
    startDate: formatClosingDateLocal(start),
    endDate: formatClosingDateLocal(end),
  };
}
