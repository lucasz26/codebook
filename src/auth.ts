import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {

    // When logging in, we'll first grab the profile id.
    async jwt({ token, account, profile }) {
        if (account && profile) {
          token.id = profile.sub ?? profile.id; // In Google's case, we have sub. But some use id.
        }
        return token;
    },
    // Then, we make it available to read. We simply just use session.user.id to pull that information.
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});