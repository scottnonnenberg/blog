export default function extractImage(body) {
  if (!body) {
    return body;
  }

  const imageR = /img[^>]+src="([^"]+)"/;
  const match = imageR.exec(body);
  if (match) {
    return match[1];
  }
}
