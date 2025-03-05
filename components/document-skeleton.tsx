'use client';

export function InlineDocumentSkeleton() {
  return (
    <div className="flex flex-col gap-2 animate-pulse">
      <div className="h-4 w-3/4 bg-muted rounded"></div>
      <div className="h-4 w-1/2 bg-muted rounded"></div>
      <div className="h-4 w-2/3 bg-muted rounded"></div>
    </div>
  );
}
