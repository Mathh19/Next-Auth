import { ButtonHTMLAttributes } from 'react';
import * as Styled from './styles';

export type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  warning?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  disabled = false,
  onClick,
  icon,
  warning = false,
}: ButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Styled.Button disabled={disabled} onClick={handleClick} warning={warning}>
      {children}
      {!!icon && icon}
    </Styled.Button>
  );
};
