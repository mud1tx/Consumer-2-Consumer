const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// const MessageModel = mongoose.model("Message", MessageSchema);
// export default MessageModel;

// const Schema = mongoose.Schema;

// const messageSchema = new Schema(
//   {
//     sender: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     content: {
//       type: String,
//       trim: true,
//     },
//     chat: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Chat",
//     },
//     readBy: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//   },
//   { timestamps: true }
// );

module.exports = mongoose.model("Message", MessageSchema);
