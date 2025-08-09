import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
    default: 0,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Counter = mongoose.models.Counter || mongoose.model("Counter", CounterSchema);

export default Counter;
