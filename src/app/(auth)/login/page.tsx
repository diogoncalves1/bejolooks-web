"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/auth/auth-context";
import { AuthCard } from "@/shared/components/auth/AuthCard";
import { PasswordInput } from "@/shared/components/auth/PasswordInput";
import { OAuthButtons } from "@/shared/components/auth/OAuthButtons";

export default function LoginPage() {
  const router = useRouter();
  const { login, error, setError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // loading próprio do submit (distinto do isLoading global, que serve para
  // restaurar a sessão a partir do token guardado)
  const [submitting, setSubmitting] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        // "rememberMe" é opcional: se o teu backend suportar, pode devolver
        // um refresh token de duração mais longa quando true.
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erro no login");
      }

      if (!data.accessToken) {
        throw new Error("Resposta inválida do servidor (sem accessToken).");
      }

      // Guarda os tokens e atualiza o estado global de autenticação
      login(data.accessToken, data.user, data.refreshToken);

      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro inesperado.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthCard title="Login">
      <OAuthButtons />

      <form onSubmit={handleLogin}>
        {error && (
          <p className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded border p-3"
          required
        />

        <div className="mb-2">
          <PasswordInput
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-6 flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Lembrar-me
          </label>

          {/* Fluxo de recuperação de password ainda não implementado (out of scope) */}
          <span className="cursor-not-allowed text-gray-400" title="Em breve">
            Esqueci-me da password
          </span>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded bg-black p-3 font-semibold text-white disabled:opacity-60"
        >
          {submitting ? "A entrar..." : "Entrar"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Ainda não tens conta?{" "}
        <Link href="/register" className="font-medium text-black underline">
          Regista-te
        </Link>
      </p>
    </AuthCard>
  );
}
