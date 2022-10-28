import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';

export default function Index() {
  const { data: session } = useSession();
  return (
    <h1>
      <span>Hello World {session && JSON.stringify(session)}</span>
    </h1>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
