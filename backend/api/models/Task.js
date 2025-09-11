// /models/Task.js
import mongoose from "mongoose";

/**
 * @typedef {Object} Task
 * @property {string} title - Título de la tarea
 * @property {string} [detail] - Detalle/descrición
 * @property {Date} datetime - Fecha y hora de la tarea
 * @property {"pending"|"in-progress"|"completed"} status - Estado de la tarea
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    detail: { type: String, trim: true },
    datetime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending", // Sprint 1: todas inician como "pending"
    },
  },
  { timestamps: true } // agrega automáticamente createdAt y updatedAt
);

export default mongoose.model("Task", taskSchema);
