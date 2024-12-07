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
                description: req.body.description
                
            })
            await offer.save();
            res.status(201).json({message: "Offer saved succesfully"});
        }else{
            const imgPath = req.file.path.replace("public", "")
            const image:IImage = new Image({
                filename: req.file.filename,
                path: imgPath
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
        console.error(`Error saving offer: ${error}`)
        res.status(500).json({message: "Internal server error"})
    }
})

router.get("/offers", async (req:Request, res:Response) => {
    try{
        const imageList :IImage[] = await Image.find()
        const offersList :IOffer[] = await Offer.find()
        console.log(offersList.length);
        if(offersList.length === 0){
            res.status(205).json({message: "No offers"})
        }else{
            console.log(offersList);
            const offersListStyled = []

            for(let i = 0; i < offersList.length; i++){
                const listImage:IImage |null = await Image.findOne({_id: offersList[i].imageId})

                const listJson = {
                    title: offersList[i].title,
                    description: offersList[i].description,
                    price: offersList[i].price,
                    imagePath: listImage ? listImage.path : null
                }
                offersListStyled.push(listJson)
                
            }
            res.status(200).json(offersListStyled)
        }
    }catch(error){
        console.error(`Error fetching offers`)
    }
})

export default router