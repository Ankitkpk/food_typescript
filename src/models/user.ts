
import mongoose, { Schema } from "mongoose";

export type IUser ={
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
