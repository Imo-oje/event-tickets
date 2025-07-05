import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export interface UserDocument extends mongoose.Document {
  userId: string;
  email: string;
  username: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}

// TODO: Add more fields like firstName, lastName, events etc. as needed

const userSchema = new mongoose.Schema<UserDocument>({
  userId: { type: String, required: true, unique: true, default: uuidv4 },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
