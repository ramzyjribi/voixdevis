import {
  GeminiConfigurationError,
  GeminiModelError,
  requestGeminiToolCalls,
} from "@/ai/geminiClient";
import type { AiRouteError } from "@/ai/types";
import { nonEmptyStringSchema, quoteSchema } from "@/domain/validation";
import { z } from "zod";

export const runtime = "nodejs";

const aiRequestSchema = z
  .object({
    message: nonEmptyStringSchema,
    quote: quoteSchema,
  })
  .strict();

const jsonError = (error: AiRouteError, status: number): Response =>
  Response.json(error, { status });

export async function POST(request: Request): Promise<Response> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonError({ error: "Requete invalide." }, 400);
  }

  const parsedBody = aiRequestSchema.safeParse(body);

  if (!parsedBody.success) {
    return jsonError(
      {
        error: "Message ou devis invalide.",
        issues: parsedBody.error.issues.map((issue) => issue.message),
      },
      400,
    );
  }

  try {
    const response = await requestGeminiToolCalls({
      quote: parsedBody.data.quote,
      userMessage: parsedBody.data.message,
    });

    return Response.json(response);
  } catch (error) {
    if (error instanceof GeminiConfigurationError) {
      return jsonError({ error: "Cle Gemini manquante." }, 503);
    }

    if (error instanceof GeminiModelError) {
      return jsonError({ error: "Gemini n'a pas produit d'action valide." }, 502);
    }

    return jsonError({ error: "Erreur IA temporaire." }, 502);
  }
}
