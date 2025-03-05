'use server';

import { getSuggestionsByDocumentId } from '@/lib/mock-data';

export async function getSuggestions({ documentId }: { documentId: string }) {
  const suggestions = await getSuggestionsByDocumentId({ documentId });
  return suggestions ?? [];
}
