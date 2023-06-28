const mongoose=require('mongoose');

const imageschema=new mongoose.Schema({
    images:String
})

const imagemodel=mongoose.model('imageitems',imageschema);


module.exports=imagemodel;