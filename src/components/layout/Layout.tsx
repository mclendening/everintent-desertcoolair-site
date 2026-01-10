import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { localBusinessSchemaString } from "@/components/seo/LocalBusinessSchema";

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

/**
 * Injects JSON-LD schema into document head
 * Uses useEffect to avoid SSG hydration mismatch
 */
function useJsonLdSchema() {
  useEffect(() => {
    const existingScript = document.querySelector('script[data-schema="local-business"]');
    if (existingScript) return;
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'local-business');
    script.textContent = localBusinessSchemaString;
    document.head.appendChild(script);
    
    return () => {
      script.remove();
    };
  }, []);
}

export default function Layout() {
  useJsonLdSchema();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
