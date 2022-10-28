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
});
