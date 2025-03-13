import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Make sure the user's image is available in the session
      if (token.picture) {
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      // When signing in, capture the profile image
      if (profile) {
        token.picture = profile.picture;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };