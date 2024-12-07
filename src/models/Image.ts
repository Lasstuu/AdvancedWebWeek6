import mongoose, { Document, ObjectId, Schema } from "mongoose";

interface IImage extends Document {
    filename: string;
    path: string;

}

let imageSchema:Schema = new Schema({
    filename: {type: String},
    path: {type: String},

})

let Image:mongoose.Model<IImage> = mongoose.model<IImage>("Image", imageSchema)
export {IImage, Image}