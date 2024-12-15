require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");

connectDB();

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/files", fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
