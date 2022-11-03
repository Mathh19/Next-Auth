export async function loadPosts(url: string, token: string) {
  const headers = new Headers();

  headers.set(`Authorization`, `Bearer ${token}`);

  const posts = await fetch(url, {
    method: 'GET',
    headers: headers,
  }).then((res) => res.json());

  return posts;
}
