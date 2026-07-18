export interface PublicApiError { message: string; status: number }

export function publicApiError(status?: number): PublicApiError {
  if (status === 429) return { status: 429, message: "The analysis service is temporarily busy. Wait a moment, then try again. Your sources are still saved." };
  if (status === 401 || status === 403) return { status: 503, message: "Live analysis is not configured correctly. The sample project remains available while an administrator checks access." };
  if (status === 404) return { status: 503, message: "The configured AI model is unavailable. Check OPENAI_MODEL, or use the sample project." };
  if (status === 408 || status === 504) return { status: 504, message: "The analysis took too long. Try again with shorter sources, or use the sample project." };
  return { status: 500, message: "The analysis could not be completed. Your sources are still saved; please try again." };
}
