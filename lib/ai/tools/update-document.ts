import { DataStreamWriter, tool } from 'ai';
interface SimpleSession {
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}
import { z } from 'zod';
import { getDocumentById, saveDocument } from '@/lib/mock-data';
import { documentHandlersByBlockKind } from '@/lib/blocks/server';

interface UpdateDocumentProps {
  session: SimpleSession;
  dataStream: DataStreamWriter;
}

export const updateDocument = ({ session, dataStream }: UpdateDocumentProps) =>
  tool({
    description: 'Update a document with the given description.',
    parameters: z.object({
      id: z.string().describe('The ID of the document to update'),
      description: z
        .string()
        .describe('The description of changes that need to be made'),
    }),
    execute: async ({ id, description }) => {
      const document = await getDocumentById({ id });

      if (!document) {
        return {
          error: 'Document not found',
        };
      }

      dataStream.writeData({
        type: 'clear',
        content: document.title,
      });

      const documentHandler = documentHandlersByBlockKind.find(
        (documentHandlerByBlockKind) =>
          documentHandlerByBlockKind.kind === document.kind,
      );

      if (!documentHandler) {
        throw new Error(`No document handler found for kind: ${document.kind}`);
      }

      await documentHandler.onUpdateDocument({
        document,
        description,
        dataStream,
        session,
      });

      dataStream.writeData({ type: 'finish', content: '' });

      return {
        id,
        title: document.title,
        kind: document.kind,
        content: 'The document has been updated successfully.',
      };
    },
  });
