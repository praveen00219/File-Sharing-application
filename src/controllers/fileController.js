const AWS = require("aws-sdk");
const File = require("../models/File");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
    };

    const result = await s3.upload(uploadParams).promise();
    const newFile = new File({
      filename: file.originalname,
      fileUrl: result.Location,
      uploadedBy: req.user.id,
    });
    await newFile.save();
    res.status(201).json(newFile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFiles = async (req, res) => {
  try {
    const files = await File.find({ uploadedBy: req.user.id });
    res.json(files);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { uploadFile, getFiles };
