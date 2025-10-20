'use client';

import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
}

