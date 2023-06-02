import aws from "aws-sdk";

aws.config.update({
  region: "eu-central-1",
});

export const bucket = "stedumprojlicenta";

export const s3 = new aws.S3();
