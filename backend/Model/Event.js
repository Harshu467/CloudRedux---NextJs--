const mongoose = require("mongoose");

const VirtualEventSchema = new mongoose.Schema(
  {
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required to create a virtual event"],
    },
    description: {
      type: String,
      required: [true, "Description is required to create a virtual event"],
      max: 2000,
    },
    date: {
      type: String,
      required: [true, "Date is required to create a virtual event"],
    },
    time: {
      type: String,
      required: [true, "Time is required to create a virtual event"],
    },
    virtualLocation: {
      type: String,
      required: [true, "Virtual location (URL or platform link) is required"],
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const VirtualEvent = mongoose.model("VirtualEvent", VirtualEventSchema);

module.exports = VirtualEvent;