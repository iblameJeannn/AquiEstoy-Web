// middleware.ts (en la raíz del proyecto)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Rutas que requieren autenticación
  const protectedRoutes = ["/dashboard", "/profile", "/donations"];
  // Rutas que solo deben ser accesibles sin autenticación
  const authRoutes = ["/auth/login", "/auth/register"];

  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Verificar si la ruta actual es protegida
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Verificar si la ruta actual es de autenticación
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Si es una ruta protegida y no hay token, redirigir al login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Si es una ruta de auth y hay token, redirigir al dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/donations/:path*",
    "/auth/:path*",
  ],
};
