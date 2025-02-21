import mongoose from "mongoose";
import { MONGO_URL } from "../config";
mongoose
  .connect(MONGO_URL as string)
  .then(() => console.log("connected to db"));
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  hashedPassword: { type: String },
});
const CreateUserSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  role: { type: String },
});
export const UsersModel = mongoose.model("Users", UserSchema);
export const CreateUsersModel = mongoose.model("CreateUsers",CreateUserSchema);
