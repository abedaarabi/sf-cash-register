import React from "react";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { admin } from "../helper/emailAdmin";
import { Spinner } from "./ui/Loading";
import {
  IconCalendar,
  IconCard,
  IconClock,
  IconCoins,
  IconNote,
  IconPencil,
  IconWarning,
} from "./ui/icons";

const kr = (value: any) => `${Number(value).toFixed(2)} kr.`;

const Row = ({ label, value, tone = "default" }: any) => (
  <div className="data-row">
    <span className="text-ink-muted">{label}</span>
    <span
      className={`shrink-0 tabular-nums ${
        tone === "default"
          ? "font-medium text-ink"
          : tone === "brand"
          ? "rounded-lg bg-brand-50 px-2 py-0.5 font-semibold text-brand-700"
          : tone === "sky"
          ? "rounded-lg bg-sky-50 px-2 py-0.5 font-semibold text-sky-700"
          : tone === "positive"
          ? "rounded-lg bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700"
          : "rounded-lg bg-rose-50 px-2 py-0.5 font-semibold text-rose-700"
      }`}
    >
      {value}
    </span>
  </div>
);

const Block = ({ title, icon, children, className = "" }: any) => (
  <div className={`rounded-2xl border border-line bg-surface-muted/60 p-3 ${className}`}>
    <h4 className="mb-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-muted">
      <span className="text-brand-600">{icon}</span>
      {title}
    </h4>
    <div className="flex flex-col gap-2">{children}</div>
  </div>
);

export const GetCloseRegister = ({
  dailyReport,
  prevFDC,
  totalCoins,
  totalNotes,
}: any) => {
  const { user } = useAuth();

  const {
    Date,
    Time,
    card_28,
    card_43,
    cashOut,
    close_by,
    closingDate,
    comments,
    done,
    id,
    invoices,
    mobile_pay,
    productSales,
    reason,
    update_by,
  } = dailyReport;

  const [isDone, setISDone] = React.useState(done);
  const [loading, setLoading] = React.useState(false);

  const payments = { card_28, card_43, mobile_pay, invoices };
  const payment = getTotal(payments);
  const neededCash = payment - prevFDC - productSales;
  const totalCash = totalCoins + totalNotes;
  const expectedCash = totalCash - Number(cashOut);
  const incomeCash = totalCoins + totalNotes - prevFDC;
  const cashDiff = totalCash + neededCash;

  async function updateDone() {
    try {
      setLoading(false);
      await doneNotDone(id, isDone);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    updateDone();
  }, [isDone]);

  return (
    <article
      className={`card-interactive flex h-full flex-col overflow-hidden ${
        isDone ? "ring-1 ring-emerald-200" : ""
      }`}
    >
      <header className="flex items-start justify-between gap-3 border-b border-line bg-gradient-to-r from-brand-50 to-sky-50 px-4 py-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-wide text-brand-600">
            Closing date
          </p>
          <p className="truncate text-base font-bold text-ink">{closingDate}</p>
        </div>
        <span
          className={`pill ${
            isDone
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {isDone ? "Done" : "Pending"}
        </span>
      </header>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <IconCalendar className="h-4 w-4" />
            {Date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <IconClock className="h-4 w-4" />
            {Time}
          </span>
        </div>

        <Block title="Payments" icon={<IconCard className="h-4 w-4" />}>
          <Row label="Card 28" value={kr(card_28)} />
          <Row label="Card 43" value={kr(card_43)} />
          <Row label="Mobile Pay" value={kr(mobile_pay)} />
          <Row label="Invoices" value={kr(invoices)} />
          <Row label="Product sales" value={kr(productSales)} tone="sky" />
        </Block>

        <Block title="Cash details" icon={<IconCoins className="h-4 w-4" />}>
          <Row label="Notes" value={kr(totalNotes)} />
          <Row label="Coins" value={kr(totalCoins)} />
          <Row label="Needed" value={kr(neededCash)} tone="sky" />
          <Row label="Close FDC" value={kr(totalCash)} tone="sky" />
          <Row label="Expected cash" value={kr(expectedCash)} tone="brand" />
        </Block>

        <div className="grid gap-2 rounded-2xl border border-line bg-surface p-3">
          <Row
            label="Cash difference"
            value={kr(cashDiff)}
            tone={cashDiff <= 0 ? "negative" : "positive"}
          />
          <Row
            label="Cash income"
            value={kr(incomeCash)}
            tone={incomeCash <= 0 ? "negative" : "positive"}
          />
        </div>

        {Number(cashOut) > 0 && (
          <Block
            title="Cash out"
            icon={<IconWarning className="h-4 w-4" />}
            className="border-rose-200 bg-rose-50/60"
          >
            <Row label="Amount" value={kr(cashOut)} tone="negative" />
            <Row label="Reason" value={reason || "—"} />
          </Block>
        )}

        <div>
          <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-muted">
            <span className="text-brand-600">
              <IconNote className="h-4 w-4" />
            </span>
            Comments
          </h4>
          <div className="max-h-40 min-h-[4rem] overflow-y-auto rounded-2xl border border-line bg-surface-muted/60 p-3">
            <p className="break-words text-sm text-ink-muted">
              {comments || "No comments!"}
            </p>
          </div>
        </div>
      </div>

      <footer className="mt-auto flex flex-col gap-3 border-t border-line bg-surface-muted/60 px-4 py-3">
        <div className="text-xs text-ink-muted">
          <p>
            Closed by <span className="font-semibold text-ink">{close_by}</span>
          </p>
          {update_by && (
            <p>
              Edited by{" "}
              <span className="font-semibold text-ink">{update_by}</span>
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {admin.includes(user.email) &&
            (!loading ? (
              <Spinner className="h-5 w-5" />
            ) : (
              <Button
                size="sm"
                variant={isDone ? "danger" : "success"}
                onClick={() => setISDone(!isDone)}
              >
                {isDone ? "Done" : "Not Done"}
              </Button>
            ))}
          <Button
            size="sm"
            variant="secondary"
            icon={<IconPencil className="h-4 w-4" />}
            href={{
              pathname: `/dashboard`,
              query: { id: id },
            }}
          >
            Edit
          </Button>
        </div>
      </footer>
    </article>
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

async function doneNotDone(id: string, isDone: boolean) {
  try {
    await fetch("/api/dailyreports/done", {
      method: "POST",
      body: JSON.stringify({ done: isDone, id }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
}
