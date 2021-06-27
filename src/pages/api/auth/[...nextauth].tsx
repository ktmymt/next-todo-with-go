import NextAuth from "next-auth"
import Providers from "next-auth/providers"

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],

  database: process.env.MONGODB_URI,
  callbacks: {
    session: async (session, user) => {
      session.id = user.id
      return Promise.resolve(session)
    },
  },
})
