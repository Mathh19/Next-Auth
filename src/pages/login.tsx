import { FormLogin } from 'components/FormLogin';
import { Wrapper } from 'components/Wrapper';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { LogoGoogle } from '@styled-icons/ionicons-solid/LogoGoogle';
import { LoginProviders } from 'components/LoginProviders';
// import { LogoGithub } from '@styled-icons/ionicons-solid';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const redirect = router.query?.redirect || '/';

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
      callbackUrl: redirect as string,
    });

    if (!response.ok) {
      setError('Email ou senha inválidos.');
      return;
    }

    window.location.href = response.url;
  };

  const handleLoginGoogle = async () => {
    await signIn('google', { callbackUrl: redirect as string });
  };

  // const handleLoginGithub = async () => {
  //   await signIn('github', { callbackUrl: redirect as string });
  // };

  return (
    <Wrapper>
      <FormLogin onLogin={handleLogin} errorMessage={error} />
      <LoginProviders>
        <LogoGoogle onClick={handleLoginGoogle} />
        {/* <LogoGithub onClick={handleLoginGithub} /> */}
      </LoginProviders>
    </Wrapper>
  );
}
