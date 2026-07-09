"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/shared/auth/auth-context";
import { saveTokens } from "@/shared/auth/token";
import { api, ApiError } from "@/shared/api/api-client";
import type { User } from "@/shared/auth/auth-context";

function OAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, setError } = useAuth();
  const [status, setStatus] = useState<"loading" | "error">("loading");

  useEffect(() => {
    async function handleCallback() {
      const accessToken = searchParams.get("accessToken");
      const refreshToken = searchParams.get("refreshToken") ?? undefined;
      const oauthError = searchParams.get("error");

      if (oauthError) {
        setError("Não foi possível concluir o login com este fornecedor.");
        setStatus("error");
        return;
      }

      if (!accessToken) {
        setError("Callback OAuth inválido (sem token).");
        setStatus("error");
        return;
      }

      try {
        // Guarda já os tokens para o api client conseguir chamar /auth/me autenticado
        saveTokens(accessToken, refreshToken);

        // NOTA (contrato assumido): GET /auth/me devolve o utilizador autenticado
        const user = await api.get<User>("/auth/me");

        login(accessToken, user, refreshToken);
        router.replace("/");
      } catch (err) {
        setError(
          err instanceof ApiError
            ? err.message
            : "Erro ao obter os dados do utilizador."
        );
        setStatus("error");
      }
    }

    handleCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "error") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-100">
        <p className="text-red-700">
          Não foi possível concluir o login. Tenta novamente.
        </p>
        <button
          onClick={() => router.replace("/login")}
          className="rounded bg-black px-4 py-2 text-white"
        >
          Voltar ao login
        </button>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <p className="text-gray-500">A concluir o login...</p>
    </main>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-gray-100">
          <p className="text-gray-500">A concluir o login...</p>
        </main>
      }
    >
      <OAuthCallbackContent />
    </Suspense>
  );
}
