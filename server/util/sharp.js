const sharp = require("sharp");

const compress = async (req, res, next) => {
  if (!req.files) {
    next();
  }
  req.body.images = [];

  await Promise.all(
    req.files.map(async (file) => {
      const image = await sharp(file.buffer)
        .resize({ width: 500, height: 500 })
        .toFormat("jpeg")
        .jpeg({ mozjpeg: true })
        .toBuffer();

      req.body.images.push({ data: image });
      console.log("stripe", req.body.images);
    })
  );

  next();
};
module.exports = compress;
