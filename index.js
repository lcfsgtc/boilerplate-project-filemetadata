var express = require("express");
var cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const path = require("path");
var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
//app.use('/public', express.static(path.join(process.cwd(), 'public')));
// Set up multer for file upload
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
  //res.sendFile(path.join(process.cwd(), 'views', 'index.html'));
});
/*app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.json({ error: "No file uploaded" });
  }
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});*/
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (req.file) {
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    });
  } else {
    res.json({ error: "No file uploaded" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
