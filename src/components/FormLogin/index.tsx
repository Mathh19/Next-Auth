import { TextInput } from 'components/TextInput';
import * as Styled from './styles';
import { useState, useEffect } from 'react';
import { Email } from '@styled-icons/material-outlined/Email';
import { Password } from '@styled-icons/material-outlined/Password';
import { Button } from 'components/Button';

export type FormLoginProps = {
  errorMessage?: string;
  onLogin?: (email: string, password: string) => Promise<void>;
};

export const FormLogin = ({ errorMessage, onLogin }: FormLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(email, password);
  }, [email, password]);

  const handleSubmit = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();

    await new Promise((r) => setTimeout(r, 5000));

    if (onLogin) {
      await onLogin(email, password);
    }

    console.log('TERMINOU', new Date().toLocaleString('pt-br'));

    setLoading(false);
  };

  return (
    <Styled.Wrapper onSubmit={handleSubmit}>
      <TextInput
        type="email"
        name="user-identifier"
        label="Seu e-mail"
        onInputChange={(value) => setEmail(value)}
        value={email}
        icon={<Email />}
      />
      <TextInput
        type="password"
        name="user-password"
        label="Sua senha"
        onInputChange={(value) => setPassword(value)}
        value={password}
        icon={<Password />}
      />

      {!!errorMessage && (
        <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>
      )}

      <Styled.ButtonWrapper>
        <Button disabled={loading}>{loading ? 'Entrar...' : 'Entrar'}</Button>
      </Styled.ButtonWrapper>
    </Styled.Wrapper>
  );
};
