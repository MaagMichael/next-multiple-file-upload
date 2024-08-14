import fs from "fs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const formDataEntryValues = Array.from(formData.values());
  for (const formDataEntryValue of formDataEntryValues) {
    if (
      typeof formDataEntryValue === "object" &&
      "arrayBuffer" in formDataEntryValue
    ) {
      const file = formDataEntryValue as unknown as Blob;
      const buffer = Buffer.from(await file.arrayBuffer());
      //   distination to store incoming files
      fs.writeFileSync(`public/${file.name}`, buffer);
    }
  }
  //   response to client if successful
  return NextResponse.json({ success: true });
}

// Property 'name' does not exist on type 'Blob'

// This error typically occurs when you're trying to access a 'name' property on a
// Blob object, but Blob doesn't have a 'name' property by default.
// The Blob object represents a file-like object of immutable, raw data. It doesn't
// inherently have a 'name' property. This error often happens when working with file
// inputs or file-like objects in JavaScript or TypeScript.
// To resolve this, you have a few options:

// 1. If you're working with a File object (which extends Blob), you can use type
//  to tell TypeScript that your Blob is actually a File:
// const file = blob as File;
// console.log(file.name);

// 2. If you need to add a name to a Blob, you can create a new object that combines the Blob with a name property:
// const namedBlob = { blob, name: 'filename.txt' };

// 3. If you're using this in a file input context, make sure you're accessing the 'name'
// property on the File object from the input, not on a Blob you've created from the file data.

// Remember, the exact solution depends on your specific use case and the context in which you're working with Blobs or Files.
