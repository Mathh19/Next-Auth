import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    max-width: 60rem;
    max-height: 800px;
    overflow-y: auto;
    width: 90%;
    margin: 8rem auto;
    background: ${theme.colors.gray12};
    padding: ${theme.spacings.xlarge};
  `}
`;
