import { z } from "zod";

export const tvaRateSchema = z.union([
  z.literal(5.5),
  z.literal(10),
  z.literal(20),
]);

export const nonEmptyStringSchema = z.string().trim().min(1);
export const positiveQuantitySchema = z.number().finite().positive();
export const nonNegativePriceSchema = z.number().finite().min(0);

export const clientInfoSchema = z
  .object({
    name: z.string().trim().optional(),
    address: z.string().trim().optional(),
    city: z.string().trim().optional(),
  })
  .strict();

export const discountSchema = z.discriminatedUnion("type", [
  z
    .object({
      type: z.literal("percent"),
      value: z.number().finite().min(0).max(100),
    })
    .strict(),
  z
    .object({
      type: z.literal("fixed"),
      value: z.number().finite().min(0),
    })
    .strict(),
]);

export const setClientInfoArgsSchema = clientInfoSchema;

export const applyInterventionTemplateArgsSchema = z
  .object({
    templateId: nonEmptyStringSchema,
    sectionName: z.string().trim().optional(),
  })
  .strict();

export const addArticleArgsSchema = z
  .object({
    articleId: nonEmptyStringSchema,
    quantity: positiveQuantitySchema.optional(),
    sectionName: z.string().trim().optional(),
  })
  .strict();

export const addCustomLineArgsSchema = z
  .object({
    designation: nonEmptyStringSchema,
    price: nonNegativePriceSchema,
    unit: nonEmptyStringSchema,
    quantity: positiveQuantitySchema,
    sectionName: z.string().trim().optional(),
  })
  .strict();

export const updateArticleArgsSchema = z
  .object({
    lineItemId: nonEmptyStringSchema,
    quantity: positiveQuantitySchema.optional(),
    price: nonNegativePriceSchema.optional(),
    designation: nonEmptyStringSchema.optional(),
  })
  .strict()
  .refine(
    (args) =>
      args.quantity !== undefined ||
      args.price !== undefined ||
      args.designation !== undefined,
    "At least one line update field is required.",
  );

export const removeArticleArgsSchema = z
  .object({
    lineItemId: nonEmptyStringSchema,
  })
  .strict();

export const deleteSectionArgsSchema = z
  .object({
    sectionName: nonEmptyStringSchema,
  })
  .strict();

export const setTvaArgsSchema = z
  .object({
    rate: tvaRateSchema,
  })
  .strict();

export const applyDiscountArgsSchema = discountSchema;

export const answerQuestionArgsSchema = z
  .object({
    userMessageFeedback: nonEmptyStringSchema,
  })
  .strict();

export const requestClarificationArgsSchema = z
  .object({
    userMessageFeedback: nonEmptyStringSchema,
    candidates: z.array(nonEmptyStringSchema).optional(),
  })
  .strict();

export const unknownActionArgsSchema = answerQuestionArgsSchema;

export const emptyToolArgsSchema = z.object({}).strict();

export const companySettingsSchema = z
  .object({
    companyName: z.string().trim().optional(),
    artisanName: z.string().trim().optional(),
    address: z.string().trim().optional(),
    postalCode: z.string().trim().optional(),
    city: z.string().trim().optional(),
    siret: z.string().trim().optional(),
    phone: z.string().trim().optional(),
    email: z.string().trim().optional(),
    defaultTvaRate: tvaRateSchema,
  })
  .strict();
