import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email: string;
  provider?: string;
  providerId?: string;
  role?: string;
}

const UserSchema = new Schema<IUser>({
  name: String,
  email: { type: String, required: true, unique: true },
  provider: String,
  providerId: String,
  role: { type: String, default: "user" },
}, { timestamps: true });

export default model<IUser>("User", UserSchema);
