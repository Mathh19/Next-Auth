import styled, { css, DefaultTheme } from 'styled-components';
import { TextInputProps } from '.';

const onInputError = (theme: DefaultTheme, errorMessage: string) => css`
  border: ${theme.spacings.xtiny} solid ${theme.colors.warning};
  box-shadow: 0 0 ${theme.spacings.xsmall} 0 ${theme.colors.warning};
  &:focus {
    border: ${theme.spacings.xtiny} solid ${theme.colors.warning};
    box-shadow: 0 0 ${theme.spacings.xtiny} 0 ${theme.colors.warning};
  }
  ${
    !!errorMessage &&
    css`
    &:focus + ${Label}, &:not(:placeholder-shown) + ${Label} {
      color: ${theme.colors.white};
      background: ${theme.colors.warning};
    }
  `
  }
`;

export const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    margin-bottom: ${theme.spacings.large};
  `}
`;

export const InputWrapper = styled.div<Pick<TextInputProps, 'errorMessage'>>`
  ${({ theme, errorMessage }) => css`
    position: relative;
    > svg {
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      right: 1rem;
      width: 2.5rem;
      height: 2.5rem;
      color: ${theme.colors.gray6};
      z-index: ${theme.layers.layer1};
      ${
        !!errorMessage &&
        css`
        color: ${theme.colors.warning};
      `
      }
    }
    *:focus ~ svg {
      color: ${theme.colors.deepWhite};
      ${
        !!errorMessage &&
        css`
        color: ${theme.colors.warning};
      `
      }
    }
    *:disabled ~ svg {
      color: ${theme.colors.gray3};
    }
  `}
`;

export const Input = styled.input<
  Pick<TextInputProps, 'errorMessage' | 'as' | 'type'>
>`
  ${({ theme, errorMessage, as }) => css`
    border: ${theme.spacings.xtiny} solid ${theme.colors.white};
    width: 100%;
    height: 100%;
    font-size: ${theme.font.sizes.normal};
    color: ${theme.colors.deepWhite};
    transition: ${theme.transitions.fast};
    padding: ${theme.spacings.small} ${theme.spacings.xsmall};
    background: transparent;
    padding-right: 3.7rem;
    outline: none;
    &::placeholder {
      visibility: hidden;
      opacity: 0;
    }
    &:focus {
      border: ${theme.spacings.xtiny} solid ${theme.colors.deepWhite};
      box-shadow: 0 0 ${theme.spacings.xsmall} 0 ${theme.colors.white};
      background: transparent;
    }
    &:focus
      + ${Label},
      &:not(:placeholder-shown)
      + ${Label},
      &:-webkit-autofill
      + ${Label} {
      top: 0;
      transform: translate(0, -50%);
      font-size: ${theme.font.sizes.xsmall};
      color: ${theme.colors.deepBlack};
      background: ${theme.colors.white};
      ${
        as === 'textarea' &&
        css`
        transform: translate(0, -50%);
      `
      }
    }
    &:disabled {
      background: ${theme.colors.gray1};
      color: ${theme.colors.gray5};
    }
    &:disabled + ${Label} {
      background: ${theme.colors.gray5};
      color: ${theme.colors.gray2};
    }
    ${
      as === 'textarea' &&
      css`
      min-height: ${theme.frameSizes.xsmall};
    `
    }
    ${!!errorMessage && onInputError(theme, errorMessage)}
  `}
`;

export const Label = styled.label<{ element: string }>`
  ${({ theme, element }) => css`
    display: inline;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: ${theme.spacings.xsmall};
    font-size: ${theme.font.sizes.small};
    height: ${theme.font.sizes.small};
    transition: ${theme.transitions.fast};
    background: transparent;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    line-height: 1;
    z-index: ${theme.layers.layer1};
    color: ${theme.colors.gray6};
    border-radius: ${theme.spacings.xtiny};
    ${
      element === 'textarea' &&
      css`
      top: ${theme.spacings.large};
      transform: translate(0, -50%);
    `
    }
  `}
`;

export const ErrorMessage = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.warning};
    margin: ${theme.spacings.xxsmall} 0 ${theme.spacings.large};
  `}
`;
