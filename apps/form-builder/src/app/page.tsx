export default async function Home() {
  const res = await fetch('localhost:3000/api/test');
  return <h1>{await res.json()}</h1>;
}
