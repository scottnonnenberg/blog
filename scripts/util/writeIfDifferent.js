import fs from 'fs';

export default function writeIfDifferent(path, contents) {
  try {
    const currentContents = fs.readFileSync(path).toString();
    if (currentContents === contents) {
      return;
    }
  }
  catch (err) {
    // file doesn't exist; need to write it
  }

  console.log(`writing ${path}`);

  fs.writeFileSync(path, contents);
}
