import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MBTISchema = new Schema(
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

const MBTI = mongoose.model("MBTI", MBTISchema);

export default MBTI;