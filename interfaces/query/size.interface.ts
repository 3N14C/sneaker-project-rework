import { Models } from "appwrite"
import { ISneaker } from "./sneaker.interface"

export interface ISize extends Models.Document {
    name: string
    sneaker: ISneaker[]
}