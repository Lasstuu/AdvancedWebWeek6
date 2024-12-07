import mongoose, { Document, ObjectId, Schema } from "mongoose";

interface IImage extends Document {
    filename: string;
    path: string;
    //_id: ObjectId;

}

let imageSchema:Schema = new Schema({
    filename: {type: String},
    path: {type: String},
    //_id: {type: Schema.Types.ObjectId}

})

let Image:mongoose.Model<IImage> = mongoose.model<IImage>("Image", imageSchema)
export {IImage, Image}