import mongoose, { Document, Schema } from "mongoose";

interface IOffer extends Document{
    title: string;
    price: number;
    description: string;
    
}

let offerSchema:Schema = new Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true}

})

let Offer:mongoose.Model<IOffer> = mongoose.model<IOffer> ("Offer", offerSchema);
export {Offer, IOffer}