import { Models } from "appwrite";
import { ISneaker } from "./sneaker.interface";

export interface IBrand extends Models.Document {
    name: string
    image: string

    sneaker: ISneaker[]
}