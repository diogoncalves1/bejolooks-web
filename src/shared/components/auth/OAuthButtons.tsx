"use client";

import { useEffect, useState } from "react";
import { getOAuthUrl } from "@/shared/auth/oauth";

export function OAuthButtons() {
  // Só existe no browser. Fica "" no SSR e no primeiro render do cliente
  // (para bater certo com o HTML do servidor) e é preenchido depois do
  // "mount", altura em que o link passa a ter o URL absoluto.
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <div className="mb-6 flex flex-col gap-3">
      <a
        href={getOAuthUrl("google", origin)}
        className="flex items-center justify-center gap-2 rounded border p-3 font-medium hover:bg-gray-50"
      >
        Continuar com Google
      </a>
      <a
        href={getOAuthUrl("apple", origin)}
        className="flex items-center justify-center gap-2 rounded border p-3 font-medium hover:bg-gray-50"
      >
        Continuar com Apple
      </a>

      <div className="my-2 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400">ou</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>
    </div>
  );
}
