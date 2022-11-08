import { unstable_getServerSession } from 'next-auth/next';
import { serverSideRedirect } from 'utils/server-side-redirect';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { GetServerSideProps } from 'next';
import { loadPosts } from 'utils/load-posts';
import { StrapiPost } from 'components/FormPost';
import { PrivateComponent } from 'components/PrivateComponent';
import { GetPostsTemplate } from 'components/Templates/GetPosts';

export type PostsPageProps = {
  posts?: StrapiPost[];
};

export default function Posts({ posts }: PostsPageProps) {
  return (
    <PrivateComponent>
      <GetPostsTemplate posts={posts} />
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
