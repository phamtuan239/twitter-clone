const mongoose = require("mongoose");
const { Schema } = mongoose;

const noficationSchema = new Schema(
  {
    createdBy:{
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reciver:{
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: String,
    postId:{
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    seen: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const Nofication = mongoose.model("Nofication", noficationSchema);

module.exports = Nofication;
