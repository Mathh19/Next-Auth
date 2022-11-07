import { StrapiPost } from 'components/FormPost';
import { PrivateComponent } from 'components/PrivateComponent';
import { UpdatePostTemplate } from 'components/Templates/UpdatePost';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { serverSideRedirect } from 'utils/server-side-redirect';
import { authOptions } from './api/auth/[...nextauth]';

export type PostPageProps = {
  post: StrapiPost;
};

export default function PostPage({ post }: PostPageProps) {
  return (
    <PrivateComponent>
      <UpdatePostTemplate post={post} />
    </PrivateComponent>
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
