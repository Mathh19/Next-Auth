import { Meta, Story } from '@storybook/react/types-6-0';
import { VpnKey } from '@styled-icons/material-outlined/VpnKey';
import { LoginProviders, LoginProvidersProps } from '.';
import { LogoGoogle } from '@styled-icons/ionicons-solid/LogoGoogle';
import { LogoGithub } from '@styled-icons/ionicons-solid/LogoGithub';
import { Wrapper } from 'components/Wrapper';
import { FormLogin } from 'components/FormLogin';
import { SessionProvider } from 'next-auth/react';

export default {
  title: 'LoginProviders',
  component: LoginProviders,
  args: {
    icon: <VpnKey />,
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ padding: '3.2rem' }}>
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    icon: {
      type: null,
    },
  },
} as Meta<LoginProvidersProps>;

export const Template: Story<LoginProvidersProps> = () => {
  return (
    <SessionProvider>
      <Wrapper>
        <FormLogin />
        <LoginProviders>
          <div>
            <LogoGoogle />
          </div>
          <div>
            <LogoGithub />
          </div>
        </LoginProviders>
      </Wrapper>
    </SessionProvider>
  );
};
