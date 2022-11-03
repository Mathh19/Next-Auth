import { useSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth/next';
import { frontEndRedirect } from 'utils/front-end-redirect';
import { serverSideRedirect } from 'utils/server-side-redirect';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { GetServerSideProps } from 'next';
import { Wrapper } from 'components/Wrapper';
import Link from 'next/link';
import { loadPosts } from 'utils/load-posts';

export type StrapiPost = {
  id?: string;
  title: string;
  content: string;
};

export type PostsPageProps = {
  posts?: StrapiPost[];
};

export default function Posts({ posts }: PostsPageProps) {
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

  return (
    <Wrapper>
      <h1>Aqui estão seus posts</h1>
      {posts.map((post) => (
        <p key={post.id}>
          <Link href={`/${post.id}`}>
            <a>
              <p>{post.title}</p>
            </a>
          </Link>
        </p>
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
