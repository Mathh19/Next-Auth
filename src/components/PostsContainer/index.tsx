import * as Styled from './styles';

export type PostsContainerProps = {
  children: React.ReactNode;
};

export function PostsContainer({ children }: PostsContainerProps) {
  return <Styled.ContainerPosts>{children}</Styled.ContainerPosts>;
}
