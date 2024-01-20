import { Models } from "appwrite";
import { ISneaker } from "./sneaker.interface";

export interface IReview extends Models.Document {
    username: string
    title: string
    body: string
    sneaker: ISneaker[]
} 