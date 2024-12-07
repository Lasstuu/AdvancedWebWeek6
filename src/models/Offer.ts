import mongoose, { Document, Schema } from "mongoose";

interface IOffer extends Document{
    title: string;
    description: string;
    price: number;
    
    
}

let offerSchema:Schema = new Schema({
    title: {type: String},
    description: {type: String},
    price: {type: Number}
    

})

let Offer:mongoose.Model<IOffer> = mongoose.model<IOffer> ("Offer", offerSchema);
export {Offer, IOffer}