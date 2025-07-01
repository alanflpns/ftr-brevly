import * as upload from "@/infra/storage/upload-file-to-storage";
import { isRight, unwrapEither } from "@/shared/either";
import { randomUUID } from "node:crypto";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { exportLinks } from "./export-links";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { makeLink } from "@/test/factories/make-link";
import { faker } from "@faker-js/faker";

beforeEach(async () => {
  await db.delete(schema.links);
});

describe("export links", () => {
  it("should be able to export links", async () => {
    const linkStub = vi
      .spyOn(upload, "uploadFileToStorage")
      .mockImplementationOnce(async () => {
        return {
          key: `${randomUUID()}.csv`,
          url: "https://storage.com/file.csv",
        };
      });

    const shortUrl = faker.string;

    const link1 = await makeLink({ shortUrl: `example1` });
    const link2 = await makeLink({ shortUrl: `example2` });
    const link3 = await makeLink({ shortUrl: `example3` });
    const link4 = await makeLink({ shortUrl: `example4` });
    const link5 = await makeLink({ shortUrl: `example5` });

    const sut = await exportLinks();

    const generatedCSVStream = linkStub.mock.calls[0][0].contentStream;

    const csvAsString = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = [];

      generatedCSVStream.on("data", (chunk) => {
        chunks.push(chunk);
      });

      generatedCSVStream.on("end", () => {
        resolve(Buffer.concat(chunks).toString("utf-8"));
      });

      generatedCSVStream.on("error", (err) => {
        reject(err);
      });
    });

    const csvAsArray = csvAsString
      .trim()
      .split("\n")
      .map((line) => line.split(","));

    expect(isRight(sut)).toBe(true);
    expect(unwrapEither(sut)).toEqual({
      reportUrl: "https://storage.com/file.csv",
    });
    expect(csvAsArray).toEqual([
      [
        "ID",
        "URL original",
        "URL encurtada",
        "Quantidade de acessos",
        "Created At",
      ],
      [link1.id, link1.originUrl, link1.shortUrl, "0", expect.any(String)],
      [link2.id, link2.originUrl, link2.shortUrl, "0", expect.any(String)],
      [link3.id, link3.originUrl, link3.shortUrl, "0", expect.any(String)],
      [link4.id, link4.originUrl, link4.shortUrl, "0", expect.any(String)],
      [link5.id, link5.originUrl, link5.shortUrl, "0", expect.any(String)],
    ]);
  });
});
