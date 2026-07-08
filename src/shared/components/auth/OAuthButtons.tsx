"use client";

import { getOAuthUrl } from "@/shared/auth/oauth";

export function OAuthButtons() {
  return (
    <div className="mb-6 flex flex-col gap-3">
      <a
        href={getOAuthUrl("google")}
        className="flex items-center justify-center gap-2 rounded border p-3 font-medium hover:bg-gray-50"
      >
        Continuar com Google
      </a>
      <a
        href={getOAuthUrl("apple")}
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
