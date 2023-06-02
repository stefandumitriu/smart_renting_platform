import multer from "multer";
import multerS3 from "multer-s3";
import { bucket, s3 } from "./config";

export const s3UploadMiddleware = (resourceName: string): multer.Multer => {
  return multer({
    storage: multerS3({
      s3,
      bucket,
      key: function (req, file, cb) {
        cb(
          null,
          new Date().toISOString() + `-${resourceName}-` + file.originalname
        );
      },
    }),
  });
};
