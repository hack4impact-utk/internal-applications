async function getStuff() {
  const res = await fetch('localhost:3000/api/test', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  return await res.json();
}

export default async function FormsPage() {
  const stuff = await getStuff();
  return <>{stuff}</>;
}
