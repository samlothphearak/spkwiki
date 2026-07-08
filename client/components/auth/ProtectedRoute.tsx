"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hook/useAuth";

const publicPaths = ["/", "/login", "/register", "/forgot-password"];

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const isPublicPage = publicPaths.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    );

    if (isPublicPage) {
      if (pathname !== "/" && isAuthenticated) {
        router.replace("/dashboard");
        return;
      }

      if (pathname === "/" && isAuthenticated) {
        router.replace("/dashboard");
        return;
      }

      setAuthorized(true);
      return;
    }

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    setAuthorized(true);
  }, [isAuthenticated, pathname, router]);

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
