import { FormPost } from 'components/FormPost';
import { Wrapper } from 'components/Wrapper';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export function CreatePostTemplate() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSave = async ({ title, content }) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/posts/`;
      const token = session.accessToken;

      const post = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ data: { title: title, content: content } }),
      }).then((res) => res.json());

      if (post) {
        router.push(`/${post.id}`);
      } else {
        throw new Error('Erro ao criar post!');
      }
    } catch (err) {
      alert('Erro ao criar post!');
    }
  };

  return (
    <Wrapper>
      <FormPost onSave={handleSave} />
    </Wrapper>
  );
}
