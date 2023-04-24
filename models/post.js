import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    category: { type: String, required: true},
    title: { type: String, required: true},
    content: { type: String, required: true, min:9 },
    keywords:  { type: String, required: true},
    createdBy: {type: Schema.ObjectId, ref: "User"}
    
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);