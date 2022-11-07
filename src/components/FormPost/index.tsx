import { Button } from 'components/Button';
import { TextInput } from 'components/TextInput';
import { useState } from 'react';

export type StrapiPost = {
  id?: string;
  title: string;
  content: string;
};

export type FormProps = {
  onSave?: (post: StrapiPost) => Promise<void>;
  post?: StrapiPost;
};

export const FormPost = ({ post, onSave }: FormProps) => {
  const { id = '', title = '', content = '' } = post || {};
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    setSaving(true);
    event.preventDefault();

    const newPost = { id, title: newTitle, content: newContent };
    if (onSave) {
      await onSave(newPost);
    }

    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        name="post-title"
        label="Post title"
        value={newTitle}
        onInputChange={(value) => setNewTitle(value)}
      />
      <TextInput
        name="post-content"
        label="Post content"
        value={newContent}
        onInputChange={(value) => setNewContent(value)}
        as={'textarea'}
      />
      <Button type="submit" disabled={saving}>
        {saving ? 'Salvando...' : 'Salvar'}
      </Button>
    </form>
  );
};
