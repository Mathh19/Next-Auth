import styled, { css } from 'styled-components';
import { Button } from 'components/Button/styles';

export const ContainerPosts = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      margin-right: ${theme.spacings.small};
    }

    ${Button} {
      margin-left: ${theme.spacings.small};
      padding: ${theme.spacings.xxsmall} ${theme.spacings.xsmall};
      font-size: ${theme.font.sizes.small};
    }
  `}
`;
