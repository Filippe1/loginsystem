import { checkAuth } from '../utils/auth';

export async function getServerSideProps(context) {
  try {
    const user = checkAuth(context.req);
    return { props: { user } };
  } catch (err) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}

export default function ProtectedPage({ user }) {
  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>This is a protected page.</p>
    </div>
  );
}