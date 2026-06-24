"use client";

import { QuoteHeader } from "@/components/quote/QuoteHeader";
import { QuoteSection } from "@/components/quote/QuoteSection";
import { QuoteTotals } from "@/components/quote/QuoteTotals";
import { ExportPdfButton } from "@/components/pdf/ExportPdfButton";
import { Separator } from "@/components/ui/separator";
import { calculateQuoteTotals } from "@/domain/quoteCalculations";
import { useQuoteStore } from "@/store/useQuoteStore";
import { FileText } from "lucide-react";
import { useMemo } from "react";

export function QuotePreview() {
  const quote = useQuoteStore((state) => state.currentQuote);
  const totals = useMemo(() => calculateQuoteTotals(quote), [quote]);

  return (
    <div className="mx-auto w-full max-w-5xl p-4 sm:p-6 lg:p-8">
      <article className="min-h-[calc(100svh-8rem)] bg-white p-5 shadow-sm ring-1 ring-zinc-200 sm:p-8">
        <QuoteHeader quote={quote} />

        <Separator className="my-6" />

        {quote.sections.length === 0 ? (
          <div className="grid min-h-64 place-items-center border border-dashed border-zinc-300 bg-zinc-50 text-center">
            <div className="max-w-xs px-6">
              <FileText className="mx-auto mb-3 size-9 text-emerald-700" />
              <p className="text-sm font-medium text-zinc-900">
                Devis vide
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {quote.sections.map((section) => (
              <QuoteSection key={section.id} section={section} />
            ))}
          </div>
        )}

        <QuoteTotals quote={quote} totals={totals} />

        <div className="mt-8 flex justify-end">
          <ExportPdfButton />
        </div>
      </article>
    </div>
  );
}
