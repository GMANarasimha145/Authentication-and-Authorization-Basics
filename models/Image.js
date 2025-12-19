const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    imageURL : {
        type : String,
        required : true
    },
    publicId : {
        type : String,
        required : true
    },
    uploadedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'AllUser'
    }
});

module.exports = mongoose.model('Image', ImageSchema);