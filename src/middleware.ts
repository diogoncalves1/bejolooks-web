import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TOKEN_NAME } from "@/shared/auth/constants";

// Rotas públicas (não exigem token). Ajusta esta lista à medida que
// forem surgindo novas páginas públicas (ex: "/register", "/forgot-password").
const PUBLIC_ROUTES = ["/login", "/register", "/oauth/callback"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(TOKEN_NAME)?.value;
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // Sem token a tentar aceder a uma rota protegida -> manda para o login
  if (!token && !isPublicRoute) {
    const loginUrl = new URL("/login", request.url);
    // Guarda a rota original para redirecionar de volta depois do login
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Já autenticado a tentar aceder ao /login -> manda para a home
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Corre em todas as rotas exceto assets estáticos, imagens e a API
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
