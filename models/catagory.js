const mongoose = require("mongoose");

const catagorySchema = mongoose.Schema({
    name : {
        type : String,
        require : true,
        unique : true
    }
},
{timestamp : true});

module.exports = mongoose.method("Catagory", catagorySchema);
