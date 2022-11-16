import * as Styled from './styled';

export type LoginProvidersProps = {
  children: React.ReactNode;
};

export const LoginProviders = ({ children }: LoginProvidersProps) => {
  return <Styled.Container>{children}</Styled.Container>;
};
