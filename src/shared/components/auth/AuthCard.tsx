import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <h1 className="mb-2 text-center text-3xl font-bold">BejoLooks</h1>
        <h2 className="mb-6 text-center text-xl text-gray-700">{title}</h2>
        {subtitle && (
          <p className="mb-6 text-center text-sm text-gray-500">{subtitle}</p>
        )}
        {children}
      </div>
    </main>
  );
}
