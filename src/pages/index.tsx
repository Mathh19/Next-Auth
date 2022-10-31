import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';

export default function Index() {
  const { data: session } = useSession();
  return (
    <h1>
      <pre>Hello World {session && JSON.stringify(session, null, 2)}</pre>
    </h1>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
