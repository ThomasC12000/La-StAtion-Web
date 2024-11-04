import mongoose from "mongoose";

const publicEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

export default mongoose.models.PublicEvent ||
  mongoose.model("PublicEvent", publicEventSchema);
