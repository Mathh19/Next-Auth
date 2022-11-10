import { gqlClient } from 'graphql/client';
import { GQL_MUTATION_AUTHENTICATE_USER } from 'graphql/mutations/auth';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

type NextAuthSession = Record<string, string>;

const actualDateInSeconds = Math.floor(Date.now() / 1000);
// It has to be the same expiry time as on the Strapi JWT
const tokenExpirationInSeconds = Math.floor(7 * 24 * 60 * 60);

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
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
          return login;
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      const isSignIn = !!user;

      if (isSignIn) {
        if (account && account.provider === 'google') {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/callback?access_token=${account?.access_token}`,
          );
          const data = await response.json();
          token = setToken(data);
          return Promise.resolve(token);
        } else {
          token = setToken(user);
          return Promise.resolve(token);
        }
      } else {
        if (!token?.expiration) return Promise.resolve({});

        if (actualDateInSeconds > +token.expiration) return Promise.resolve({});
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
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },
};

type StrapiUser = {
  id: string;
  username: string;
  email: string;
};

type StrapiLoginData = {
  jwt: string;
  user: StrapiUser;
};

const setToken = (data: StrapiLoginData): NextAuthSession => {
  if (!data || !data?.user || !data?.jwt) return {};

  return {
    jwt: data.jwt,
    id: data.user.id,
    name: data.user.username,
    email: data.user.email,
    expiration: `${actualDateInSeconds + tokenExpirationInSeconds}`,
  };
};

export default NextAuth(authOptions);
