import { useState, useEffect, type ReactNode } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * ClientOnly component for SSG/SSR hydration safety.
 * 
 * Use this to wrap any components that:
 * - Use browser-only APIs (window, document, localStorage)
 * - Render portals (Toaster, Sonner, modals, dropdowns)
 * - Have hydration mismatches between server and client
 * 
 * The children will only render after the component has mounted on the client.
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <>{children}</> : <>{fallback}</>;
}
