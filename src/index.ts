import { Request, Response, Router } from "express"
import { IOffer, Offer } from "./models/Offers"


const router:Router = Router()

type TOffer = {
    title: string;
    price: number;
    description: string;
    //image: File
}

router.post("/upload", async (req:Request, res:Response)=>{
    const title:string = req.body.title;
    const price:number = req.body.price;
    const description:string = req.body.description;
    //const image:File = req.body.image;
    console.log(title, price, description);
    try{
        const offer:IOffer = new Offer({
            title: title,
            price: price,
            description: description
        })
        await offer.save();
    }catch(error:any){
        console.error(`Error saving user: ${error}`)

    }
})

export default router