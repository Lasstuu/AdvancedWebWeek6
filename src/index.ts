import { Request, Response, Router } from "express"
import { IOffer, Offer } from "./models/Offer"
import { IImage, Image } from "./models/Image"
import upload from "./middleware/multer-config"


const router:Router = Router()

// type TOffer = {
//     title: string;
//     price: number;
//     description: string;
//     //image: File
// }

router.post("/upload", upload.single("image"), async (req:Request, res:Response)=>{
    // const title:string = req.body.title;
    // const price:number = req.body.price;
    // const description:string = req.body.description;
    // const image:File = req.body.image;
    //console.log(title, price, description);
    try{
        if(!req.file){
            const offer:IOffer = new Offer({
                title: req.body.title,
                price: req.body.price,
                description: req.body.description,
                
            })
            await offer.save();
            res.status(201).json({message: "Offer saved succesfully"});
        }else{
        const image:IImage = new Image({
            filename: req.file.filename,
            path: req.file.path
        })
        await image.save();
        const offer:IOffer = new Offer({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            imageId: image._id
        })

        await offer.save();
        res.status(201).json({message: "Offer saved succesfully with image"});
        }
    }catch(error:any){
        console.error(`Error saving user: ${error}`)
        res.status(500).json({message: "Internal server error"})
    }
})

export default router