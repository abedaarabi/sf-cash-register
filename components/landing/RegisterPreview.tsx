import React from "react";
import { IconBanknote, IconCalculator } from "../ui/icons";

const bars = [52, 68, 44, 84, 71, 96, 78];

const Line = ({ label, value }: { label: string; value: string }) => (
  <div className="data-row">
    <span className="text-ink-muted">{label}</span>
    <span className="font-semibold tabular-nums text-ink">{value}</span>
  </div>
);

/** Decorative product shot for the landing hero. */
export const RegisterPreview = () => (
  <div className="relative" aria-hidden="true">
    <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-brand-200/50 to-sky-200/40 blur-2xl" />

    <div className="card relative overflow-hidden p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-brand-600">
            Tonight&apos;s register
          </p>
          <p className="text-sm font-semibold text-ink">Friday · 02:14</p>
        </div>
        <span className="pill bg-emerald-100 text-emerald-700">Balanced</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-3">
          <div className="flex items-center gap-2 text-amber-700">
            <IconBanknote className="h-4 w-4" />
            <p className="text-[11px] font-bold uppercase tracking-wide">
              Opening FDC
            </p>
          </div>
          <p className="mt-1 text-lg font-bold tabular-nums text-amber-900">
            4.489,50 kr.
          </p>
        </div>
        <div className="rounded-2xl border border-brand-100 bg-brand-50/70 p-3">
          <div className="flex items-center gap-2 text-brand-700">
            <IconCalculator className="h-4 w-4" />
            <p className="text-[11px] font-bold uppercase tracking-wide">
              Counted cash
            </p>
          </div>
          <p className="mt-1 text-lg font-bold tabular-nums text-brand-800">
            10.144,50 kr.
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-2xl border border-line bg-surface-muted/60 p-3">
        <div className="flex flex-col gap-2">
          <Line label="Card 28" value="4.200,50 kr." />
          <Line label="MobilePay" value="900,00 kr." />
          <Line label="Product sales" value="5.400,00 kr." />
        </div>
      </div>

      <div className="mt-3 rounded-2xl border border-line bg-surface p-3">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-ink-muted">
          Product sales · last 7 shifts
        </p>
        <div className="flex h-24 items-end gap-2">
          {bars.map((height, index) => (
            <span
              key={index}
              style={{ height: `${height}%` }}
              className="flex-1 rounded-t-lg bg-gradient-to-t from-brand-500 to-brand-400"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);
