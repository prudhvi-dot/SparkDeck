import mongoose, { Schema, model, models, Types } from "mongoose";
import Author from "./Author";

interface Startup {
  _id?: Types.ObjectId;
  title: string;
  author: Types.ObjectId;
  views: number;
  description: string;
  category: string;
  image: string;
  content: string;
}

export interface StartupPopulated extends Omit<Startup, "author"> {
  author: Author;
}

const StartupSchema = new Schema<Startup>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    views: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Startup =
  models.Startup || model<Startup>("Startup", StartupSchema);

export default Startup;
