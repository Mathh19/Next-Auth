import { Button } from 'components/Button';
import { FormLogin } from 'components/FormLogin';
import { Wrapper } from 'components/Wrapper';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleLogin = async (email: string, password: string) => {
    if (!email) {
      setError('Preencha o campo de e-mail vazio.');
      return;
    }

    if (!password) {
      setError('Preencha o campo de senha vazio.');
      return;
    }

    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (!response.ok) {
      setError('Email ou senha inválidos.');
      return;
    }

    const redirect = router.query?.redirect || '/';
    router.push(redirect as string);
  };

  const handleLoginGoogle = async () => {
    await signIn('google', { callbackUrl: '/' });
  };

  return (
    <Wrapper>
      <FormLogin onLogin={handleLogin} errorMessage={error} />
      <br />
      <Button onClick={handleLoginGoogle}>Login com google</Button>
    </Wrapper>
  );
}
