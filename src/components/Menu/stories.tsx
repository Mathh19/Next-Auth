import { Meta, Story } from '@storybook/react/types-6-0';
import { TextInput } from 'components/TextInput';
import { SessionProvider } from 'next-auth/react';
import { Menu } from '.';

export default {
  title: 'Menu',
  component: Menu,
} as Meta;

export const Template: Story = (args) => {
  return (
    <SessionProvider>
      <div
        style={{
          maxWidth: '60rem',
          width: '90%',
          background: 'rgb(21, 21, 24)',
          padding: '3.6rem',
          margin: '8rem auto',
        }}
      >
        <Menu {...args} />
        <TextInput name="test" label="test" />
      </div>
    </SessionProvider>
  );
};
