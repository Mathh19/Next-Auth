import styled, { css } from 'styled-components';
import { ButtonProps } from '.';

export const Button = styled.button<Pick<ButtonProps, 'warning'>>`
  ${({ theme, warning }) => css`
    background: transparent;
    border: 2px solid ${!warning ? theme.colors.white : theme.colors.warning};
    color: ${!warning ? theme.colors.white : theme.colors.warning};
    font-size: ${theme.font.sizes.normal};
    padding: ${theme.spacings.xsmall} ${theme.spacings.medium};
    cursor: pointer;
    transition: ${theme.transitions.fast};
    display: flex;
    align-items: center;
    justify-content: center;

    &:focus {
      outline: none;
      box-shadow: 0 0 ${theme.spacings.xxsmall} ${
    !warning ? theme.colors.white : theme.colors.warning
  };
      filter: brightness(110%);
    }
    &:hover {
      background-color: ${!warning ? theme.colors.white : theme.colors.warning};
      color: ${!warning ? theme.colors.deepBlack : theme.colors.white};
      filter: brightness(90%);
    }
    &:disabled {
      background: ${theme.colors.gray4};
      border-color: ${theme.colors.gray4};
      color: ${theme.colors.deepBlack};
      cursor: not-allowed;
      &:hover {
        filter: none;
      }
    }
    > svg {
      width: 2rem;
      height: 2rem;
      margin-left: 1rem;
    }
  `}
`;
