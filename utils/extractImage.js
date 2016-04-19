export default function extractImage(body) {
  const imageR = /img[^>]+src="([^"]+)"/;
  const match = imageR.exec(body);
  if (match) {
    return match[1];
  }
}
