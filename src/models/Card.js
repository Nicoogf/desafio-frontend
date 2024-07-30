import mongoose, { model, models, Schema } from "mongoose";

const CardSchema = new Schema({
    name :{
        type: String
    },
    mount:{
        type: Number,
        default: 500000
    },
    codeSegurity:{
        type: Number
    },
    serial:{
        type: Number
    },
    vto:{
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{
    timestamps: true
})

const Card = models.Card || model("Card" , CardSchema)
export default Card