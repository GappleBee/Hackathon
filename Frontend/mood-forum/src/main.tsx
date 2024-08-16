import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App.tsx'
import './index.css'
import { VerticalSidebarProvider } from './context/context.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <VerticalSidebarProvider>
        <App />
      </VerticalSidebarProvider>
    </BrowserRouter>
  </StrictMode>,
)
