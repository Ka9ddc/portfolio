import mongoose from "mongoose";
import bcrypt from "bcrypt";

const projectSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  project: { type: String },
  message: { type: String },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
