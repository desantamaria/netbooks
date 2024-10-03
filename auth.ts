import NextAuth from "next-auth"
import { ConvexAdapter } from "@/app/ConvexAdapter";
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [],
  adapter: ConvexAdapter,
})
