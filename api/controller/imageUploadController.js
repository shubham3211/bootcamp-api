const uuid = require("uuid");
const aws = require("aws-sdk");

const S3 = new aws.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey
});

const imageUpload = (req, res) => {
  fileName = `${uuid()}.jpeg`;
  S3.getSignedUrl(
    "putObject",
    {
      Bucket: "blog-image-bucket-111",
      Key: fileName,
      ContentType: "image/jpeg"
    },
    (err, url) => {
      if (err) {
        console.log(err);
      }
      res.send({ fileName, url });
    }
  );
};

module.exports = { imageUpload };
