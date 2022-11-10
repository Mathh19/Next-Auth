import 'next-auth';

declare module 'next-auth' {
  interface User {
    jwt: string;
    user: {
      id: string;
      username: string;
      email: string;
      expiration?: number;
    };
  }

  interface Session {
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
}
