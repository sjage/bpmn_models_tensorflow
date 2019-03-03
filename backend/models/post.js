const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    //custom configuration
    //type of data we want to save
    title: { type: String, required: true},
    category: { type: String, required: true},
    sub_cat: { type: String, required: true},
    content: { type: String, required: true},
    image: { type: String, required: true}
});
// to create models based on definition - turn to model

module.exports = mongoose.model('Post', postSchema);

