import { PrivateComponent } from 'components/PrivateComponent';
import { CreatePostTemplate } from 'components/Templates/CreatePost';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { serverSideRedirect } from 'utils/server-side-redirect';
import { authOptions } from './api/auth/[...nextauth]';

export default function CreatePost() {
  return (
    <PrivateComponent>
      <CreatePostTemplate />
    </PrivateComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions,
  );

  if (!session) {
    return serverSideRedirect(context);
  }

  return {
    props: {
      session,
    },
  };
};
