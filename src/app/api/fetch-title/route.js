export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  try {
    const res = await fetch(url);
    const html = await res.text();

    const match = html.match(/<title>(.*?)<\/title>/i);
    const title = match ? match[1] : url;

    return Response.json({ title });
  } catch (err) {
    return Response.json({ title: url });
  }
}
