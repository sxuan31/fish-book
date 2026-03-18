import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SeafoodPage from './SeafoodPage';
import VenuesPage from './VenuesPage';
import { ThemeProvider } from '@/components/theme-provider';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/fish" replace />} />
          <Route path="/fish" element={<SeafoodPage />} />
          <Route path="/venues" element={<VenuesPage />} />
          <Route path="*" element={<Navigate to="/fish" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
