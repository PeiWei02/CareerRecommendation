import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TheVarkSchema = new Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true
        },
        highest:{
            type:String,
            require:true
        },
        result:{
            type:Object,
            require:true
        }
    }
)

const TheVark = mongoose.model("TheVark", TheVarkSchema);

export default TheVark;