import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClientOnly } from "@/components/ClientOnly";

/**
 * SSG-safe App Providers
 * 
 * CRITICAL for SSG/SSR:
 * - QueryClient created inside component with useState to prevent shared state across renders
 * - Toaster/Sonner wrapped in ClientOnly to prevent hydration mismatches from portals
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  // CRITICAL: Create QueryClient inside component to prevent shared state across SSR renders
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* CRITICAL: Portal-based components must be in ClientOnly to prevent hydration mismatch */}
        <ClientOnly>
          <Toaster />
          <Sonner />
        </ClientOnly>
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default AppProviders;
