import { Models } from "appwrite"
import { IBrand } from "./brand.interface"
import { IOffer } from "./offer.interface"
import { ISize } from "./size.interface"
import { IReview } from "./review.interface"
import { IOrder } from "./order.interface"

export interface ISneaker extends Models.Document {
    name: string
    price: number
    soldCount: number
    image: string[]
    description: string
    rating: number

    offer: IOffer
    size: ISize[] | string
    brand: IBrand
    review: IReview[]
    order: IOrder[]
}