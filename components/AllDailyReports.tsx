import React from "react";
import { useAuth } from "../context/AuthContext";
import { admin } from "../helper/emailAdmin";
import {
  fetchDailyReportsByRange,
  sortReportsByClosingDate,
} from "../helper/fetchDailyReports";
import { getDefaultClosingDateRange } from "../helper/closingDateRange";
import { GetCloseRegister } from "./GetCloseRegister";
import { DateSelector } from "./DateSelector";
import { PageHeader } from "./ui/PageHeader";
import { PageLoader } from "./ui/Loading";
import { IconInfo, IconReport } from "./ui/icons";

export const AllDailyReports = () => {
  const [dailyReport, setDailyReport] = React.useState([]) as any;
  const [loading, setLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const defaultRange = React.useMemo(() => getDefaultClosingDateRange(), []);

  const loadReports = React.useCallback(async (range: typeof defaultRange) => {
    if (!range.startDate || !range.endDate) {
      setLoadError("Pick a from and to date.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setLoadError(null);

    try {
      const result = sortReportsByClosingDate(
        await fetchDailyReportsByRange(range)
      );
      setDailyReport(result);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }
      console.error(err);
      setDailyReport([]);
      setLoadError(
        err instanceof Error
          ? err.message
          : "Could not load reports for those dates."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const { user } = useAuth();

  React.useEffect(() => {
    loadReports(defaultRange);
  }, [defaultRange, loadReports]);

  if (loading) {
    return <PageLoader label="Loading reports…" />;
  }

  const isAdmin = user?.email && admin.includes(user.email);
  const fakeArr = (
    isAdmin ? dailyReport.slice(1) : [dailyReport[dailyReport.length - 1]]
  ).filter(Boolean);

  return (
    <div className="app-shell">
      <PageHeader
        title="Daily reports"
        subtitle={
          isAdmin
            ? "Every closed register, newest filtered by date range"
            : "Your latest closed register"
        }
        icon={<IconReport className="h-5 w-5" />}
      />

      {loadError ? (
        <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {loadError}
        </div>
      ) : null}

      {isAdmin && (
        <div className="mb-6">
          <DateSelector getdate={loadReports} defaultRange={defaultRange} />
        </div>
      )}

      {fakeArr.length === 0 ? (
        <div className="card flex flex-col items-center gap-3 p-10 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <IconInfo className="h-6 w-6" />
          </span>
          <p className="text-base font-semibold text-ink">No reports yet</p>
          <p className="max-w-sm text-sm text-ink-muted">
            {isAdmin
              ? "No closings in this date range. Try widening the dates or check that reports use YYYY-MM-DD closing dates."
              : "Closed registers will show up here as soon as the first report is submitted."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {fakeArr.map((report: any, index: any) => {
            const firstItem = index >= 0 && dailyReport[index];

            const countCoins = {
              twenty_kr: report.twenty_kr,
              ten_kr: report.ten_kr,
              five_kr: report.five_kr,
              two_kr: report.two_kr,
              one_kr: report.one_kr,
              half_kr: report.half_kr,
            };

            const countNote = {
              one_thousand_kr: report.one_thousand_kr,
              five_hundred_kr: report.five_hundred_kr,
              two_hundred_kr: report.two_hundred_kr,
              one_hundred_kr: report.one_hundred_kr,
              fifty_kr: report.fifty_kr,
            };

            const prevcountCoins = {
              twenty_kr: firstItem.twenty_kr,
              ten_kr: firstItem.ten_kr,
              five_kr: firstItem.five_kr,
              two_kr: firstItem.two_kr,
              one_kr: firstItem.one_kr,
              half_kr: firstItem.half_kr,
            };

            const prevcountNote = {
              one_thousand_kr: firstItem.one_thousand_kr,
              five_hundred_kr: firstItem.five_hundred_kr,
              two_hundred_kr: firstItem.two_hundred_kr,
              one_hundred_kr: firstItem.one_hundred_kr,
              fifty_kr: firstItem.fifty_kr,
            };

            const prevCoins = getTotal(prevcountCoins);
            const prevNotes = getTotal(prevcountNote);

            const coins = getTotal(countCoins);
            const notes = getTotal(countNote);

            const prevFDC = prevCoins + prevNotes - (firstItem?.cashOut || 0);

            return (
              <GetCloseRegister
                key={report.id}
                dailyReport={report}
                prevFDC={prevFDC}
                totalCoins={coins}
                totalNotes={notes}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const getTotal = (obj: any) => {
  let total = 0;

  for (const key in obj) {
    const element = +obj[key];
    total += element;
  }
  return total;
};
