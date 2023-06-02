import { bucket, s3 } from "./config";

export const getSignedUrlForResource = (key: string): string => {
  return s3.getSignedUrl("getObject", {
    Bucket: bucket,
    Key: key,
    Expires: 900,
  });
};
