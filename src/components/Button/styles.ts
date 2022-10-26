import styled, { css } from 'styled-components';

export const Button = styled.button`
  ${({ theme }) => css`
    background: ${theme.colors.deepWhite};
    border: none;
    color: ${theme.colors.deepBlack};
    font-size: ${theme.font.sizes.normal};
    padding: ${theme.spacings.xsmall} ${theme.spacings.medium};
    cursor: pointer;
    transition: ${theme.transitions.fast};
    display: flex;
    align-items: center;
    justify-content: center;

    &:focus {
      outline: none;
      box-shadow: 0 0 ${theme.spacings.xxsmall} ${theme.colors.deepWhite};
      filter: brightness(110%);
    }
    &:hover {
      filter: brightness(90%);
    }
    &:disabled {
      background: ${theme.colors.gray4};
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
