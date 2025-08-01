import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const users = [
  {
    id: "1",
    name: "Instructor User",
    email: "instructor@test.com",
    password: "password123",
    role: "instructor",
  },
  {
    id: "2",
    name: "Student User",
    email: "student@test.com",
    password: "password123",
    role: "student",
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = users.find((user) => user.email === credentials.email);

        if (user && user.password === credentials.password) {
          return { id: user.id, name: user.name, email: user.email, role: user.role };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", 
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };