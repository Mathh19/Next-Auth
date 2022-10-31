import { gqlClient } from 'graphql/client';
import { GQL_MUTATION_AUTHENTICATE_USER } from 'graphql/mutations/auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email or username', placeholder: 'Email or username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { login } = await gqlClient.request(
            GQL_MUTATION_AUTHENTICATE_USER,
            {
              email: credentials.email,
              password: credentials.password,
            },
          );

          const { jwt, user } = login;
          const { id, username, email } = user;

          if (!jwt || !id || !username || !email) {
            return null;
          }

          return {
            jwt,
            id,
            name: username,
            email,
          };
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const isSignIn = !!user;
      const actualDateInSeconds = Math.floor(Date.now() / 1000);

      // It has to be the same expiry time as on the Strapi JWT
      const tokenExpirationInSeconds = Math.floor(7 * 24 * 60 * 60);

      if (isSignIn) {
        if (!user || !user.name || !user.email || !user.id || !user.jwt) {
          return Promise.resolve({});
        }

        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.jwt = user.jwt;

        token.expiration = Math.floor(
          actualDateInSeconds + tokenExpirationInSeconds,
        );
      } else {
        if (!token?.expiration) return Promise.resolve({});

        if (actualDateInSeconds > token.expiration) return Promise.resolve({});
      }

      return Promise.resolve(token);
    },
    async session({ session, token }) {
      if (
        !token?.jwt ||
        !token?.id ||
        !token?.expiration ||
        !token.email ||
        !token?.name
      ) {
        return null;
      }

      session.accessToken = token.jwt as string;
      session.user = {
        id: token.id as string,
        name: token.name,
        email: token.email,
      };
      return { ...session };
    },
  },
});
