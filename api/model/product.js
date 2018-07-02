// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Product', new Schema({ 
    cat_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category' 
    },
    name: {
        type: String,
        required: true
    },
    description: String, 
    image_url: String, 
    title: {
        type: String, 
        required: true
    },
    product_url: String, 

}));
