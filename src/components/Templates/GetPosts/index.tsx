import { Button } from 'components/Button';
import { StrapiPost } from 'components/FormPost';
import { PostsContainer } from 'components/PostsContainer';
import { Wrapper } from 'components/Wrapper';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export type PostsPageProps = {
  posts?: StrapiPost[];
};

export function GetPosts({ posts }: PostsPageProps) {
  const { data: session } = useSession();
  const [statePosts, setStatePosts] = useState(posts);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setStatePosts(posts);
  }, [posts]);

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
