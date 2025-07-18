import { envConfig } from "@/env";
import { S3Client } from "@aws-sdk/client-s3";

export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${envConfig.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: envConfig.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: envConfig.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
});
