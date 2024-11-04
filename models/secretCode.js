import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
  secretCode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Code || mongoose.model("Code", codeSchema);
