import { TextInput } from 'components/TextInput';
import * as Styled from './styles';
import { useState } from 'react';
import { Email } from '@styled-icons/material-outlined/Email';
import { EyeOutline } from '@styled-icons/evaicons-outline/EyeOutline';
import { EyeOffOutline } from '@styled-icons/evaicons-outline/EyeOffOutline';
import { Button } from 'components/Button';

export type FormLoginProps = {
  errorMessage?: string;
  onLogin?: (email: string, password: string) => Promise<void>;
};

export const FormLogin = ({ errorMessage, onLogin }: FormLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();

    if (onLogin) {
      await onLogin(email, password);
    }

    setLoading(false);
  };

  const handleClick = () => {
    setDisplayPassword(!displayPassword);
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
        required={true}
      />
      <TextInput
        type={displayPassword ? 'text' : 'password'}
        name="user-password"
        label="Sua senha"
        onInputChange={(value) => setPassword(value)}
        value={password}
        required={true}
        icon={
          displayPassword ? (
            <EyeOutline onClick={handleClick} />
          ) : (
            <EyeOffOutline onClick={handleClick} />
          )
        }
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
