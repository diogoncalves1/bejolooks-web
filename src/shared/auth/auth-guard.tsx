"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useAuth } from "./auth-context";

interface AuthGuardProps {
  children: ReactNode;
}

/**
 * Guard simples para páginas protegidas.
 *
 * O middleware (src/middleware.ts) já bloqueia o pedido no servidor quando
 * não há token. Este componente complementa isso no lado do cliente:
 * - evita mostrar conteúdo protegido "às faíscas" (flash) enquanto a sessão
 *   ainda está a ser restaurada;
 * - reage de imediato a um logout() (sem precisar de recarregar a página).
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">A carregar...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Evita renderizar conteúdo protegido durante o redirecionamento
    return null;
  }

  return <>{children}</>;
}
