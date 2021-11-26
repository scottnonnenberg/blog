import { readFileSync, writeFileSync } from 'fs';

export default function writeIfDifferent(path: string, contents: string): void {
  try {
    const currentContents = readFileSync(path).toString();
    if (currentContents === contents) {
      return;
    }
  } catch (error) {
    // file doesn't exist; need to write it
  }

  console.log(`writing ${path}`);

  writeFileSync(path, contents);
}
