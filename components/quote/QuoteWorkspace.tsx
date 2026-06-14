"use client";

import { ManualAddLineForm } from "@/components/quote/ManualAddLineForm";
import { ClientInfoForm } from "@/components/quote/ClientInfoForm";
import { Separator } from "@/components/ui/separator";
import { useQuoteStore } from "@/store/useQuoteStore";

export function QuoteWorkspace() {
  const quote = useQuoteStore((state) => state.currentQuote);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b px-4 py-4">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
          Chantier
        </p>
        <h2 className="mt-1 text-xl font-semibold text-zinc-950">
          {quote.client.name || "Nouveau client"}
        </h2>
      </div>

      <div className="min-h-0 flex-1 overflow-auto px-4 py-5">
        <ClientInfoForm />
        <Separator className="my-5" />
        <ManualAddLineForm />
      </div>
    </div>
  );
}
