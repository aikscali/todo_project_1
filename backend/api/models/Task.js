const mongoose = require("mongoose");


const TaskSchema = new mongoose.Schema(
  {
    ownerId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    title: {type: String, required: true, trim: true},
    description: {type: String, default: ""},
    status: {type: String, enum: ["todo", "in_progress", "done", "archived"], default: "todo"},
    priority: {type: String, enum: ["low", "medium", "high", "urgent"],default: "medium"},
    dueDate: {type: Date},
    startDate: {type: Date},
    completedAt: {type: Date},
    labels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        required: false
      }
    ],
  
  },
  {
    timestamps: true
  }
);


module.exports = mongoose.model("Task", TaskSchema);