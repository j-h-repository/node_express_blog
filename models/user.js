import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true, min: 5, max: 25 },
    password: { type: String, trim: true, required: true, min:9 },
    isAdmin: {type:Boolean, default: false}
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
