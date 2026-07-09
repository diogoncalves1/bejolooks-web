import { AuthGuard } from "@/shared/auth/auth-guard";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <section>{children}</section>
    </AuthGuard>
  );
}
