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
    entry: 'src/components/layout/Layout.tsx',
    children: [
      { 
        index: true, 
        Component: React.lazy(() => import('@/pages/Home')),
      },
      { 
        path: 'services', 
        Component: React.lazy(() => import('@/pages/Services')),
      },
      { 
        path: 'about', 
        Component: React.lazy(() => import('@/pages/About')),
      },
      { 
        path: 'contact', 
        Component: React.lazy(() => import('@/pages/Contact')),
      },
    ],
  },
];
