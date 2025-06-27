import { db, pg } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { uploadFileToStorage } from "@/infra/storage/upload-file-to-storage";
import { type Either, makeRight } from "@/shared/either";
import { stringify } from "csv-stringify";
import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

type ExportLinksOutput = {
  reportUrl: string;
};

export async function exportLinks(): Promise<Either<never, ExportLinksOutput>> {
  const { sql, params } = db
    .select({
      id: schema.links.id,
      originUrl: schema.links.originUrl,
      shortUrl: schema.links.shortUrl,
      qtdAccess: schema.links.qtdAccess,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .toSQL();

  const cursor = pg.unsafe(sql, params as string[]).cursor(1);

  const csv = stringify({
    delimiter: ",",
    header: true,
    columns: [
      {
        key: "id",
        header: "ID",
      },
      {
        key: "origin_url",
        header: "URL original",
      },
      {
        key: "short_url",
        header: "URL encurtada",
      },
      {
        key: "qtd_access",
        header: "Quantidade de acessos",
      },
      {
        key: "created_at",
        header: "Created At",
      },
    ],
  });

  const uploadToStorageStream = new PassThrough();

  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk);
        }
        callback();
      },
    }),
    csv,
    uploadToStorageStream
  );

  const uploadToStorage = uploadFileToStorage({
    contentType: "text/csv",
    folder: "downloads",
    fileName: `${new Date().toISOString()}-uploads.csv`,
    contentStream: uploadToStorageStream,
  });

  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline]);

  return makeRight({ reportUrl: url });
}
