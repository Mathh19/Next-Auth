import { Wrapper } from 'components/Wrapper';
import { useSession } from 'next-auth/react';

export default function OpenRoutePage() {
  const { data: session } = useSession();

  return (
    <Wrapper>
      <h1>Rota aberta</h1>
      {session ? (
        <div>
          <h2>Você está logado</h2>
          <p>Olá {session.user.name}</p>
        </div>
      ) : (
        <div>
          <h2>Você não está logado</h2>
          <p>Olá</p>
        </div>
      )}
    </Wrapper>
  );
}
