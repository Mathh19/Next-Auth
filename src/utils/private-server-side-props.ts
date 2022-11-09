import { GetServerSidePropsContext } from 'next';
import { Session, unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { serverSideRedirect } from './server-side-redirect';

export const PrivateServerSideProps = async <T>(
  context: GetServerSidePropsContext,
  callbackFn: (session: Session) => Promise<T>,
) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions,
  );

  if (!session) {
    return serverSideRedirect(context);
  }

  try {
    const result = await callbackFn(session);

    return result;
  } catch (error) {
    console.log('Ocorreu um error', error);
    return serverSideRedirect(context);
  }
};
