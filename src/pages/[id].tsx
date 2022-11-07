import { FormPost, StrapiPost } from 'components/FormPost';
import { Wrapper } from 'components/Wrapper';
import { gqlClient } from 'graphql/client';
import { GQL_MUTATION_UPDATE_POST } from 'graphql/mutations/post';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { frontEndRedirect } from 'utils/front-end-redirect';
import { serverSideRedirect } from 'utils/server-side-redirect';
import { authOptions } from './api/auth/[...nextauth]';

export type PostPageProps = {
  post: StrapiPost;
};

export default function PostPage({ post }: PostPageProps) {
  const { data: session, status } = useSession();

  if (!session && status !== 'loading') {
    return frontEndRedirect();
  }

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (typeof window === 'undefined') return null;

  if (status === 'unauthenticated') {
    return <p>Você não está autenticado</p>;
  }

  const handleSave = async ({ id, title, content }) => {
    try {
      await gqlClient.request(
        GQL_MUTATION_UPDATE_POST,
        { id, title, content },
        { Authorization: `Bearer ${session.accessToken}` },
      );
    } catch (err) {
      alert('Erro ao salvar o post!');
    }
  };

  return (
    <Wrapper>
      <FormPost onSave={handleSave} post={post} />
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions,
  );
  const { id } = context.params;

  if (!session) {
    return serverSideRedirect(context);
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`;
    const token = session.accessToken;
    const headers = new Headers();
    headers.set(`Authorization`, `Bearer ${token}`);

    const post = await fetch(url, {
      method: 'GET',
      headers: headers,
    }).then((res) => res.json());

    return {
      props: {
        session,
        post,
      },
    };
  } catch (error) {
    console.log(error);
    return serverSideRedirect(context);
  }
};
