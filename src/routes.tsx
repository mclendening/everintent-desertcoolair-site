import type { RouteRecord } from 'vite-react-ssg';
import React from 'react';
import Layout from '@/components/layout/Layout';
import { AppProviders } from '@/App';

// Wrap Layout with providers
const LayoutWithProviders = () => (
  <AppProviders>
    <Layout />
  </AppProviders>
);

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <LayoutWithProviders />,
    children: [
      { 
        index: true, 
        Component: React.lazy(() => import('@/pages/Home')),
        entry: 'src/pages/Home.tsx',
      },
      { 
        path: 'services', 
        Component: React.lazy(() => import('@/pages/Services')),
        entry: 'src/pages/Services.tsx',
      },
      { 
        path: 'about', 
        Component: React.lazy(() => import('@/pages/About')),
        entry: 'src/pages/About.tsx',
      },
      { 
        path: 'contact', 
        Component: React.lazy(() => import('@/pages/Contact')),
        entry: 'src/pages/Contact.tsx',
      },
    ],
  },
];
