
require('dotenv').config()
const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
exports.uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise()
}

// downloads a file from s3
function getFileStream(fileKey) {
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName
    }
    try {
      const fileDownload = s3.getObject(downloadParams);
      return fileDownload.createReadStream();
    } catch (error) {
      console.log(error);
    }
  }
exports.getFileStream = getFileStream

//delete a file
exports.deleteFile = (key) => {
  const deleteParams = {
    Bucket: bucketName,
    Key: key
  }

  return s3.deleteObject(deleteParams).promise();
}
