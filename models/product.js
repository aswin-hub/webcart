const mongoose = require("mongoose");
const catagory = require("./catagory");
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required :  true
    },
    description : {
        type : String,
        required :  true
    },
    price : {
        type : Number,
        required : true
    },
    catagory : {
        type : ObjectId,
        ref : "catagory",
        required : true
    },
    stock : {
        type : Number
    },
    sold : {
        type : Number,
        default : 0
    },
    photo : {
        data : Buffer,
        contentType : String
    }

},
{timestamps: true}
)

module.exports = mongoose.model("Product", productSchema);

module.exports = mongoose.model("Product", productSchema)
