import { StrapiPost } from 'components/FormPost';
import { PrivateComponent } from 'components/PrivateComponent';
import { UpdatePostTemplate } from 'components/Templates/UpdatePost';
import { GetServerSideProps } from 'next';
import { PrivateServerSideProps } from 'utils/private-server-side-props';

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
  return await PrivateServerSideProps(context, async (session) => {
    const { id } = context.params;
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
  });
};
