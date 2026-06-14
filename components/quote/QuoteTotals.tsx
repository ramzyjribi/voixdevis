"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Quote, QuoteTotals as QuoteTotalsType } from "@/domain/quoteTypes";
import { formatCurrency } from "@/lib/money";
import { useQuoteStore } from "@/store/useQuoteStore";

type QuoteTotalsProps = {
  quote: Quote;
  totals: QuoteTotalsType;
};

export function QuoteTotals({ quote, totals }: QuoteTotalsProps) {
  const setTva = useQuoteStore((state) => state.setTva);
  const applyDiscount = useQuoteStore((state) => state.applyDiscount);

  return (
    <div className="mt-8 flex justify-end">
      <div className="w-full max-w-sm space-y-2 text-sm">
        <TotalLine label="Sous-total HT" value={totals.subtotalHt} />
        <div className="grid grid-cols-[1fr_auto] items-center gap-3">
          <span className="text-zinc-600">Remise</span>
          <div className="flex gap-1">
            <Button
              type="button"
              variant={quote.discount?.type === "percent" ? "default" : "outline"}
              size="xs"
              onClick={() => applyDiscount({ type: "percent", value: 10 })}
            >
              10 %
            </Button>
            <Button
              type="button"
              variant={quote.discount?.type === "fixed" ? "default" : "outline"}
              size="xs"
              onClick={() => applyDiscount({ type: "fixed", value: 50 })}
            >
              50 €
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={() => applyDiscount({ type: "fixed", value: 0 })}
            >
              0
            </Button>
          </div>
        </div>
        <TotalLine label="Montant remise" value={totals.discountAmount} />
        <TotalLine label="Total HT" value={totals.totalAfterDiscountHt} />
        <div className="grid grid-cols-[1fr_112px] items-center gap-3">
          <span className="text-zinc-600">TVA</span>
          <Select
            value={String(quote.tvaRate)}
            onValueChange={(value) =>
              setTva({ rate: Number.parseFloat(value) as 5.5 | 10 | 20 })
            }
          >
            <SelectTrigger aria-label="TVA">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5.5">5.5 %</SelectItem>
              <SelectItem value="10">10 %</SelectItem>
              <SelectItem value="20">20 %</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <TotalLine label="Montant TVA" value={totals.tvaAmount} />
        <div className="mt-3 grid grid-cols-2 border-t border-zinc-300 pt-3 text-base font-semibold text-zinc-950">
          <span>Total TTC</span>
          <span className="text-right">{formatCurrency(totals.totalTtc)}</span>
        </div>
      </div>
    </div>
  );
}

function TotalLine({ label, value }: { label: string; value: number }) {
  return (
    <div className="grid grid-cols-2 text-zinc-700">
      <span>{label}</span>
      <span className="text-right font-medium text-zinc-950">
        {formatCurrency(value)}
      </span>
    </div>
  );
}
