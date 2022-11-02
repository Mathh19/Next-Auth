import styled, { css } from 'styled-components';

export const Wrapper = styled.nav`
  ${({ theme }) => css`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin-bottom: ${theme.spacings.xlarge};

    a {
      text-decoration: none;
      margin: 0 ${theme.spacings.small};
      padding: ${theme.spacings.xxsmall} 0;

      &::after {
      content: '';
      display: block;
      width: 0;
      height: 0.2rem;
      background-color: ${theme.colors.deepWhite};
      transition: all 300ms ease-in-out;
    }
    &:hover::after {
      width: 100%;
    }
    }
  `}
`;
