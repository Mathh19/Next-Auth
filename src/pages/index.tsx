import { GetServerSideProps } from 'next';

export default function Index() {
  return (
    <h1>
      <span>Hello World</span>
    </h1>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  console.log(process.env.VAR);
  return {
    props: {},
  };
};
