var mongoose=require('mongoose');
const Schema =mongoose.Schema;

const cartSchema=new Schema({
  user:String,
    dishes:[{
        dishid:String,
        quantity:Number,
        price:Number,
        name:String,
        image:String
    }]
},{
    timestamps:true
});

var Carts=mongoose.model('cart',cartSchema);
module.exports=Carts;