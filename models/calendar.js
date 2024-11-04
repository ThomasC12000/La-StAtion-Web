import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  priority: { type: String, required: true },
  userId: { type: String, required: true }, // Utilisation de String au lieu de ObjectId
});

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
