import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Head } from "vite-react-ssg";
import Header from "./Header";
import Footer from "./Footer";
import { localBusinessSchemaString } from "@/components/seo/LocalBusinessSchema";

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

export default function Layout() {
  return (
    <>
      {/* Global SEO Schema for Google Business Place Results */}
      <Head>
        <script type="application/ld+json">{localBusinessSchemaString}</script>
      </Head>
      
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}
