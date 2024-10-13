import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // If the url is already a valid path in our app, just return it
      if (url.startsWith(baseUrl)) return url;
      // Otherwise, redirect to the dashboard
      return `${baseUrl}/home`;
    },
    async authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = request.nextUrl;
      const protectedRoutes = [
        '/protected', '/notification', '/doctor', 
        '/activity', '/consult', '/dispensing',
        '/doctor/[id]', '/home'
      ];
      const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
      const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');

      if (isProtectedRoute) {
        if (isLoggedIn) return true;
        return NextResponse.redirect(new URL('/login', request.url));
      }

      if (isAuthRoute) {
        if (isLoggedIn) return NextResponse.redirect(new URL('/home', request.url));
        return true;
      }

      return true;
    },
  },
  providers: [], // Add your providers here
};
