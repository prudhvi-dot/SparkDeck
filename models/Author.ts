import { Schema, model, models, Types } from "mongoose";

interface Author {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  image: string;
  bio: string;
}

const AuthorSchema = new Schema<Author>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "Intuitive Creator"
    },
  },
  { timestamps: true }
);

const Author =
  models?.Author || model<Author>("Author", AuthorSchema);

export default Author;
