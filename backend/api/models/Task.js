const mongoose = require("mongoose");

/**
 * Schema definition for the Task model.
 *
 * Represents a task belonging to a user, with metadata such as status,
 * priority, due dates, and optional labels.
 *
 * @typedef {Object} Task
 * @property {mongoose.Schema.Types.ObjectId} ownerId - The ID of the user who owns the task (reference to User model).
 * @property {string} title - The title of the task (required, trimmed).
 * @property {string} [description] - Optional detailed description of the task.
 * @property {"todo"|"in_progress"|"done"|"archived"} status - The current status of the task (default: "todo").
 * @property {"low"|"medium"|"high"|"urgent"} priority - The priority level of the task (default: "medium").
 * @property {Date} [dueDate] - Optional deadline for completing the task.
 * @property {Date} [startDate] - Optional date when the task is planned to start.
 * @property {Date} [completedAt] - Optional date when the task was completed.
 * @property {mongoose.Schema.Types.ObjectId[]} [labels] - Optional array of label IDs referencing the Tag model.
 * @property {Date} createdAt - Timestamp when the task was created (added automatically).
 * @property {Date} updatedAt - Timestamp when the task was last updated (added automatically).
 */
const TaskSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: ["todo", "in_progress", "done", "archived"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    dueDate: { type: Date },
    startDate: { type: Date },
    completedAt: { type: Date },
    labels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

/**
 * Task model.
 *
 * Provides an interface for interacting with the `tasks` collection in MongoDB.
 *
 * @type {mongoose.Model<Task>}
 */
module.exports = mongoose.model("Task", TaskSchema);
