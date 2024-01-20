import { Models } from "appwrite";
import { ISneaker } from "./sneaker.interface";

export interface IOffer extends Models.Document {
  discount: number;
  description: string;
  day: string;
  sneaker: ISneaker[]
}
