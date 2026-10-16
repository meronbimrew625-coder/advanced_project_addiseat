
import { connection } from 'next/server';
import { redirect } from 'next/navigation';
import { getSession } from '../../lib/auth';

export const metadata = {
  title: 'Kitchen Dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function KitchenPage() {
  await connection();

  const user = await getSession();

  if (!user) {
    redirect('/signin');
  }

  if (user.role !== 'kitchen') {
    redirect('/');
  }

  return (
    <main className="kitchen-page">
      <h1>Kitchen Dashboard</h1>
      <p>Welcome, {user.name}.</p>
      <p>Only authorized kitchen staff can access this page.</p>
    </main>
  );
}
