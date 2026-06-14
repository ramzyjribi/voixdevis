import { z } from "zod";
import {
  companySettingsSchema,
  discountSchema,
  tvaRateSchema,
} from "../domain/validation.ts";

export const QUOTE_STORE_NAME = "voixdevis-quote-store";
export const QUOTE_STORE_VERSION = 1;

const quoteLineItemSchema = z
  .object({
    lineItemId: z.string(),
    source: z.enum(["catalog", "template", "custom"]),
    articleId: z.string().optional(),
    templateId: z.string().optional(),
    designation: z.string(),
    unit: z.string(),
    quantity: z.number().positive(),
    unitPriceHt: z.number().min(0),
  })
  .strict();

const quoteSectionSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    lineItems: z.array(quoteLineItemSchema),
  })
  .strict();

const quoteSchema = z
  .object({
    id: z.string(),
    status: z.literal("draft"),
    createdAt: z.string(),
    updatedAt: z.string(),
    quoteNumber: z.string().optional(),
    client: z
      .object({
        name: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
      })
      .strict(),
    sections: z.array(quoteSectionSchema),
    discount: discountSchema.optional(),
    tvaRate: tvaRateSchema,
  })
  .strict();

const chatMessageSchema = z
  .object({
    id: z.string(),
    role: z.enum(["user", "assistant", "system"]),
    content: z.string(),
    createdAt: z.string(),
  })
  .strict();

const clarificationSchema = z
  .object({
    userMessageFeedback: z.string(),
    candidates: z.array(z.string()),
  })
  .strict()
  .nullable();

export const persistedQuoteStateSchema = z
  .object({
    currentQuote: quoteSchema,
    companySettings: companySettingsSchema,
    messages: z.array(chatMessageSchema),
    clarification: clarificationSchema,
  })
  .strict();

export type QuotePersistedState = z.infer<typeof persistedQuoteStateSchema>;

export const parsePersistedQuoteState = (
  persistedState: unknown,
): QuotePersistedState | undefined => {
  const parsed = persistedQuoteStateSchema.safeParse(persistedState);
  return parsed.success ? parsed.data : undefined;
};
