import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { unstable_getServerSession } from 'next-auth/next';
import { frontEndRedirect } from 'utils/front-end-redirect';
import { serverSideRedirect } from 'utils/server-side-redirect';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { GetServerSideProps } from 'next';
import { loadPosts } from 'utils/load-posts';
import { PostsContainer } from 'components/PostsContainer';
import { Wrapper } from 'components/Wrapper';
import Link from 'next/link';
import { Button } from 'components/Button';
import { StrapiPost } from 'components/FormPost';

export type PostsPageProps = {
  posts?: StrapiPost[];
};

export default function Posts({ posts }: PostsPageProps) {
  const { data: session, status } = useSession();
  const [statePosts, setStatePosts] = useState(posts);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setStatePosts(posts);
  }, [posts]);

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

  async function handleDelete(id: string) {
    setDeleting(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`;
      const token = session.accessToken;
      const headers = new Headers();
      headers.set(`Authorization`, `Bearer ${token}`);

      await fetch(url, {
        method: 'DELETE',
        headers: headers,
      }).then((res) => res.json());

      setStatePosts((state) => state.filter((post) => post.id !== id));
    } catch (err) {
      alert('Não foi possível excluir esse post');
    }

    setDeleting(false);
  }

  return (
    <Wrapper>
      <h1>Aqui estão seus posts</h1>
      {statePosts.map((post) => (
        <PostsContainer key={post.id}>
          <Link href={`/${post.id}`}>
            <a>
              <p>{post.title}</p>
            </a>
          </Link>{' '}
          |{' '}
          <Button
            warning={true}
            onClick={() => handleDelete(post.id)}
            disabled={deleting}
          >
            excluir
          </Button>
        </PostsContainer>
      ))}
    </Wrapper>
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

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/posts`;
    const token = session.accessToken;

    const posts = await loadPosts(url, token);

    return {
      props: {
        session,
        posts,
      },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    props: {},
  };
};
