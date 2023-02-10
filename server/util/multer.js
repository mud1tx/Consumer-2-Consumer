const multer = require("multer");

//set storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("dfgsfg", file);
    cb(null, "./server/uploads");
  },
  filename: function (req, file, cb) {
    console.log("asdjasndkjasndkjankdjansjkdjnas", file);
    var ext = file.originalname.substr(file.originalname.lastIndexOf("."));
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const store = multer({ storage: storage });
console.log("erggdrgdgdrgd", store);
module.exports = store;
