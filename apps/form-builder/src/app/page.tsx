import { getFormById } from '@/server/actions/forms';

export default async function Home() {
  const form = await getFormById('656ea21e70fac31f8c4aab53');
  console.log(form);
  return <h1>Home page</h1>;
}