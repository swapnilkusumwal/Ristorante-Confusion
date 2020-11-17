var mongoose=require('mongoose');
const Schema =mongoose.Schema;

const orderSchema=new Schema({
  user:String,
    dishes:[{
        dishid:String,
        quantity:{type:Number,default:1},
        price:Number,
        name:String,
        image:String
    }]
},{
    timestamps:true
});

var Orders=mongoose.model('order',orderSchema);
module.exports=Orders;