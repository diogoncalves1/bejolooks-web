"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/shared/auth/auth-context";
import { listSessions, revokeSession, type Session } from "@/shared/auth/sessions";
import { ApiError } from "@/shared/api/api-client";

export default function SessionsPage() {
  const { logoutEverywhere } = useAuth();
  const [sessions, setSessions] = useState<Session[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const data = await listSessions();
        if (isMounted) {
          setSessions(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof ApiError
              ? err.message
              : "Não foi possível carregar as sessões."
          );
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [reloadKey]);

  async function handleRevoke(sessionId: string) {
    setRevokingId(sessionId);
    try {
      await revokeSession(sessionId);
      setSessions((prev) => prev?.filter((s) => s.id !== sessionId) ?? null);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Não foi possível terminar esta sessão."
      );
    } finally {
      setRevokingId(null);
    }
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Sessões ativas</h1>

      {error && (
        <div className="mb-4 flex items-center justify-between rounded bg-red-100 p-3 text-red-700">
          <span>{error}</span>
          <button
            onClick={() => setReloadKey((k) => k + 1)}
            className="ml-4 text-sm font-medium underline"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {sessions === null && !error && (
        <p className="text-gray-500">A carregar sessões...</p>
      )}

      {sessions?.length === 0 && (
        <p className="text-gray-500">Sem outras sessões ativas.</p>
      )}

      <ul className="flex flex-col gap-3">
        {sessions?.map((session) => (
          <li
            key={session.id}
            className="flex items-center justify-between rounded border p-4"
          >
            <div>
              <p className="font-medium">
                {session.device}
                {session.current && (
                  <span className="ml-2 rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">
                    Este dispositivo
                  </span>
                )}
              </p>
              <p className="text-sm text-gray-500">
                {session.location ?? session.ip ?? "Localização desconhecida"} · última
                atividade em {new Date(session.lastActiveAt).toLocaleString("pt-PT")}
              </p>
            </div>

            {!session.current && (
              <button
                onClick={() => handleRevoke(session.id)}
                disabled={revokingId === session.id}
                className="rounded border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                {revokingId === session.id ? "A terminar..." : "Terminar sessão"}
              </button>
            )}
          </li>
        ))}
      </ul>

      {sessions && sessions.length > 1 && (
        <button
          onClick={logoutEverywhere}
          className="mt-6 text-sm font-medium text-red-600 underline"
        >
          Terminar todas as sessões (incluindo esta)
        </button>
      )}
    </main>
  );
}
