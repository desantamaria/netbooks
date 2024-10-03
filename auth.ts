import { ConvexAdapter } from "@/app/ConvexAdapter";
import { SignJWT, importPKCS8 } from "jose";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";
import GoogleProvider from "next-auth/providers/google";


if (process.env.CONVEX_AUTH_PRIVATE_KEY === undefined) {
  throw new Error(
    "Missing CONVEX_AUTH_PRIVATE_KEY Next.js environment variable",
  );
}

if (process.env.NEXT_PUBLIC_CONVEX_URL === undefined) {
  throw new Error(
    "Missing NEXT_PUBLIC_CONVEX_URL Next.js environment variable",
  );
}

const CONVEX_SITE_URL = process.env.NEXT_PUBLIC_CONVEX_URL!.replace(
  /.cloud$/,
  ".site",
);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
        }
      }),
    Resend({
      name: "email",
      from: "My App <onboarding@resend.dev>",
    }),
  ],
  adapter: ConvexAdapter,
  callbacks: {
    // Attach a JWT for authenticating with Convex
    async session({ session }) {
      const privateKey = await importPKCS8(
        process.env.CONVEX_AUTH_PRIVATE_KEY!,
        "RS256",
      );
      const convexToken = await new SignJWT({
        // These fields will be available on `ctx.auth.getUserIdentity()`
        // in Convex functions:
        sub: session.userId,
      })
        .setProtectedHeader({ alg: "RS256" })
        .setIssuedAt()
        .setIssuer(CONVEX_SITE_URL)
        .setAudience("convex")
        .setExpirationTime("1h")
        .sign(privateKey);
      return { ...session, convexToken };
    },
  },
});

declare module "next-auth" {
  interface Session {
    convexToken: string;
  }
}
