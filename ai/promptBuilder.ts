import { catalogArticles, interventionTemplates } from "../domain/catalogLookup.ts";
import { calculateQuoteTotals } from "../domain/quoteCalculations.ts";
import type { Quote, QuoteLineItem } from "../domain/quoteTypes.ts";

type BuildGeminiPromptInput = {
  quote: Quote;
  userMessage: string;
};

const compactLineItem = (lineItem: QuoteLineItem) => ({
  lineItemId: lineItem.lineItemId,
  articleId: lineItem.articleId,
  templateId: lineItem.templateId,
  designation: lineItem.designation,
  unit: lineItem.unit,
  quantity: lineItem.quantity,
  unitPriceHt: lineItem.unitPriceHt,
});

const compactQuote = (quote: Quote) => ({
  id: quote.id,
  client: quote.client,
  tvaRate: quote.tvaRate,
  discount: quote.discount,
  totals: calculateQuoteTotals(quote),
  sections: quote.sections.map((section) => ({
    id: section.id,
    name: section.name,
    lineItems: section.lineItems.map(compactLineItem),
  })),
});

const compactCatalog = () => ({
  articles: catalogArticles.map((article) => ({
    id: article.id,
    designation: article.designation,
    unit: article.unit,
    price: article.price,
    keywords: article.keywords,
  })),
  templates: interventionTemplates.map((template) => ({
    id: template.id,
    title: template.title,
    keywords: template.keywords,
    items: template.items,
  })),
});

export const buildGeminiPrompt = ({
  quote,
  userMessage,
}: BuildGeminiPromptInput): string =>
  [
    "[CATALOGUE_DISPONIBLE]",
    JSON.stringify(compactCatalog()),
    "",
    "[CONTEXTE_DEVIS_ACTUEL]",
    JSON.stringify(compactQuote(quote)),
    "",
    "[MESSAGE_UTILISATEUR]",
    userMessage,
  ].join("\n");
