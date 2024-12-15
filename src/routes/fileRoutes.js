const express = require("express");
const multer = require("multer");
const { uploadFile, getFiles } = require("../controllers/fileController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", authMiddleware, upload.single("file"), uploadFile);
router.get("/", authMiddleware, getFiles);

module.exports = router;
