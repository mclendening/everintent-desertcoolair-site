import type { RouteRecord } from 'vite-react-ssg';
import Layout from '@/components/layout/Layout';
import { AppProviders } from '@/App';

// Direct imports for SSG - React.lazy() causes inconsistent pre-rendering
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import About from '@/pages/About';
import Contact from '@/pages/Contact';

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
        element: <Home />,
      },
      { 
        path: 'services', 
        element: <Services />,
      },
      { 
        path: 'about', 
        element: <About />,
      },
      { 
        path: 'contact', 
        element: <Contact />,
      },
    ],
  },
];
