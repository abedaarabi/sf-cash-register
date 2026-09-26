export type DailyReportRow = {
  id: number;
  closingDate: string;
  [key: string]: unknown;
};

export type DateRange = { startDate: string; endDate: string };

export function sortReportsByClosingDate<T extends { closingDate: string }>(
  rows: T[]
): T[] {
  return [...rows].sort((a, b) => a.closingDate.localeCompare(b.closingDate));
}

export async function fetchDailyReportsByRange(
  range: DateRange,
  signal?: AbortSignal
): Promise<DailyReportRow[]> {
  const params = new URLSearchParams({
    startDate: range.startDate,
    endDate: range.endDate,
  });

  const res = await fetch(`/api/dailyreports/report?${params}`, { signal });
  let body: { message?: string; response?: DailyReportRow[] } = {};
  try {
    body = await res.json();
  } catch {
    throw new Error("Could not read the server response.");
  }

  if (!res.ok) {
    throw new Error(body.message || "Could not load reports for those dates.");
  }

  return body.response ?? [];
}
