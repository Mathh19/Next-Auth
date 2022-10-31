import styled, { css } from 'styled-components';

export const Wrapper = styled.form``;

export const ButtonWrapper = styled.div``;

export const ErrorMessage = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.warning};
  `}
`;
