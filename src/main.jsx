import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  RouterProvider,
} from "react-router-dom";
import router from './Router/Router';
import AuthProvider from './Providers/Auth/AuthProvider';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './Update/ThemeProvider';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
