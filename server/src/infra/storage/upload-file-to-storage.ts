import { envConfig } from "@/env";
import { Upload } from "@aws-sdk/lib-storage";
import { randomUUID } from "node:crypto";
import { basename, extname } from "node:path";
import { Readable } from "node:stream";
import { z } from "zod";
import { r2 } from "./client";

const uploadFileToStorageInput = z.object({
  folder: z.enum(["downloads"]),
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
});

type UploadFileToStorageInput = z.input<typeof uploadFileToStorageInput>;

export async function uploadFileToStorage(input: UploadFileToStorageInput) {
  const { folder, fileName, contentStream, contentType } =
    uploadFileToStorageInput.parse(input);

  const fileExtension = extname(fileName);
  const fileNameWithoutExtension = basename(fileName);
  const sanitizedFileName = fileNameWithoutExtension.replace(
    /[^a-zA-Z0-9]/g,
    ""
  );
  const sanitizedFileNameWithExtension =
    sanitizedFileName.concat(fileExtension);

  const uniqueFileName = `${folder}/${randomUUID()}-${sanitizedFileNameWithExtension}`;

  const upload = new Upload({
    client: r2,
    params: {
      Key: uniqueFileName,
      Bucket: envConfig.CLOUDFLARE_BUCKET,
      Body: contentStream,
      ContentType: contentType,
    },
  });

  await upload.done();

  return {
    key: uniqueFileName,
    url: new URL(uniqueFileName, envConfig.CLOUDFLARE_PUBLIC_URL).toString(),
  };
}
