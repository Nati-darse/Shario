import { Schema, model, Document, Types } from "mongoose";

export interface IResource extends Document {
  title: string;
  description?: string;
  link: string;
  type: "video" | "book" | "article" | "course" | "other";
  category?: string;
  tags: string[];
  uploadedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema = new Schema<IResource>({
  title: { type: String, required: true, trim: true },
  description: { type: String },
  link: { type: String, required: true },
  type: { type: String, enum: ["video","book","article","course","other"], default: "other" },
  category: { type: String, index: true },
  tags: [{ type: String }],
  uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default model<IResource>("Resource", ResourceSchema);
