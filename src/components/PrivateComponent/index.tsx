import { useSession } from 'next-auth/react';
import { frontEndRedirect } from 'utils/front-end-redirect';

export type PrivateComponentProps = {
  children: React.ReactNode;
};

export function PrivateComponent({ children }: PrivateComponentProps) {
  const { data: session, status } = useSession();

  if (!session && status !== 'loading') {
    return frontEndRedirect();
  }

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (typeof window === 'undefined') return null;

  if (status === 'unauthenticated') {
    return <p>Você não está autenticado</p>;
  }
  return children;
}
