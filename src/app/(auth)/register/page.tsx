"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/auth/auth-context";
import { AuthCard } from "@/shared/components/auth/AuthCard";
import { PasswordInput } from "@/shared/components/auth/PasswordInput";
import { PasswordStrengthMeter } from "@/shared/components/auth/PasswordStrengthMeter";
import { OAuthButtons } from "@/shared/components/auth/OAuthButtons";

export default function RegisterPage() {
  const router = useRouter();
  const { login, error, setError } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("As passwords não coincidem.");
      return;
    }

    if (password.length < 8) {
      setError("A password deve ter pelo menos 8 caracteres.");
      return;
    }

    setSubmitting(true);

    try {
      // NOTA (contrato assumido): POST /auth/register -> { accessToken, refreshToken?, user }
      // Se o teu backend não fizer login automático após o registo, troca
      // este bloco por: registar -> redirecionar para /login com mensagem de sucesso.
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erro ao criar a conta.");
      }

      if (data.accessToken) {
        // Backend faz login automático após registo
        login(data.accessToken, data.user, data.refreshToken);
        router.push("/");
      } else {
        // Backend só cria a conta; utilizador tem de fazer login manualmente
        router.push("/login?registered=1");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro inesperado.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthCard title="Criar conta">
      <OAuthButtons />

      <form onSubmit={handleRegister}>
        {error && (
          <p className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</p>
        )}

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 w-full rounded border p-3"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded border p-3"
          required
        />

        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <PasswordStrengthMeter password={password} />

        <div className="mt-4 mb-6">
          <PasswordInput
            placeholder="Confirmar password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded bg-black p-3 font-semibold text-white disabled:opacity-60"
        >
          {submitting ? "A criar conta..." : "Criar conta"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Já tens conta?{" "}
        <Link href="/login" className="font-medium text-black underline">
          Entrar
        </Link>
      </p>
    </AuthCard>
  );
}
