import { AuthProvider } from "@/shared/auth/auth-context";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <AuthProvider>{children}</AuthProvider>
    </section>
  );
}
