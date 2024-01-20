import { Models } from "appwrite";

export interface IUser extends Models.Preferences {
  id: string;
  name: string;
  email: string;
}
