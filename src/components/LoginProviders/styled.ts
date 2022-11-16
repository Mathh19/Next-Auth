import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
  width: 100%;
  display: flex;
  flex-flow: row;
  padding: ${theme.spacings.small} 0 ;
    svg {
      width: 35px;
      height: 35px;
      margin-right: ${theme.spacings.xsmall};
      cursor: pointer;
    }
  `}
`;
