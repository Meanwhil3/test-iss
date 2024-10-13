import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import prisma from '@/utils/db';
import { LoginUser as CustomUser } from '@/types/models';

// Fetch user from the database and convert id to string
async function getUser(email: string): Promise<CustomUser | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      // Convert id to string
      return { ...user, id: user.id.toString() };
    }

    return null;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET, // Make sure this is defined
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return user; // Return the user with id as string
          }
        }
        return null;
      },
    }),
  ],
});
