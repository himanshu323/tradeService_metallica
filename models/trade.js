

const mongoose=require("mongoose");

let trade=mongoose.Schema({
    tradeDate:{type:Date,required:true},
    commodity:{type:String,required:true},
    side: { type: String, required: true },
     quantity:{type:Number,required:true},
     price:{type:Number,required:true},
     tradeId:{type:Number,required:true},

    counterparty: { type: String, required: true },
    location: { type: String, required: true },
    creator:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
})


module.exports=mongoose.model("Trade",trade);