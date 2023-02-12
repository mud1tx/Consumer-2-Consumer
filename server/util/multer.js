const multer = require("multer");

//set storage
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./server/uploads");
//   },
//   filename: function (req, file, cb) {
//     var ext = file.originalname.substr(file.originalname.lastIndexOf("."));
//     cb(null, file.fieldname + "-" + Date.now() + ext);
//   },
// });

// const store = multer({ storage: storage });
const storage = multer.memoryStorage();
const upload = multer({ storage }).array("images");
module.exports = upload;

