// import mongoose from "mongoose";
import { Schema, model } from mongoose
import {toJSON} from "@reis/mongoose-to-json";

const userSchema = new Schema(
   {
      fisrtname: { type: String, required: true },
      lastname: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, enum: ["user", "vendor"], default: "user" },

   },
   {
      timestamps: true
   }
);
userSchema.plugin(toJSON);
export const userModel = model("user", userSchema);