const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageName: {
    type: [String],
    required: true,
  },
  imageType: {
    type: [String],
    required: true,
  },
  image:{
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required: true,
  }
});

// productSchema.virtual('imgSrc').get(function(){
//   if(this.image!=null && this.imageType!=null){
//     return `data:${this.imageType}:charSet=utf-8;base64,${this.image.toString('base64')}`
//   }
// })

// productSchema.virtual("imgSrc").get(function () {
//   const imageSrcData = [];
//   for (let i = 0; i < this.image.length; i++) {
//     if (this.image[i] != null && this.imageType[i] != null) {
//       imageSrcData.push(
//         `data:${this.imageType[i]}:charSet=utf-8;base64,${this.image[
//           i
//         ].toString("base64")}`
//       );
//     }
//   }
//   return imageSrcData;
// });

module.exports = mongoose.model("Product", productSchema);
