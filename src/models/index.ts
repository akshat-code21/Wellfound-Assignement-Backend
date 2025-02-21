import mongoose from "mongoose";
import { MONGO_URL } from "../config";
mongoose
  .connect(MONGO_URL as string)
  .then(() => console.log("connected to db"));
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  hashedPassword: { type: String, required: true },
});
const CreateUserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  role: { type: String, required: true },
});
export const UsersModel = mongoose.model("Users", UserSchema);
export const CreateUsersModel = mongoose.model("CreateUsers", CreateUserSchema);
