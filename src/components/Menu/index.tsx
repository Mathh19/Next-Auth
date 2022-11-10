import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import * as Styled from './styles';

export const Menu = () => {
  const { data: session } = useSession();
  const [redirect, setRdirect] = useState('/');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setRdirect(encodeURI(window.location.pathname));
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    signOut({ redirect: false });
  };

  return (
    <Styled.Wrapper>
      <Link href="/">
        <a>Página inicial</a>
      </Link>
      <Link href="/posts">
        <a>Ver posts</a>
      </Link>
      <Link href="/create-post">
        <a>Criar post</a>
      </Link>
      <Link href="/open-route">
        <a>Rota aberta</a>
      </Link>

      {session ? (
        <a href="#" onClick={handleClick}>
          Sair
        </a>
      ) : (
        <Link
          href={{
            pathname: '/login',
            query: {
              redirect,
            },
          }}
        >
          <a>Login</a>
        </Link>
      )}
    </Styled.Wrapper>
  );
};
