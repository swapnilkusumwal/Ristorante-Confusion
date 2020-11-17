const express = require('express');
const bodyParser = require('body-parser');
const authenticate=require('../authenticate');
const cors=require('./cors');
const paymentRouter = express.Router();
const https = require('https');
const PaytmChecksum = require('./PaytmChecksum');
const config=require('./../config');
const Carts = require("../models/carts");
const Orders= require("../models/orders");
paymentRouter.use(bodyParser.json());
paymentRouter.route('/cash')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Carts.findOneAndDelete({user:req.user._id})
    .catch(err=>console.log(err))
    Orders.create(req.body)
    .then(data=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.send("hrllo")
    })
    .catch(err=>{

        err= new Error('Could not create your order');
        err.status=501;
        return next(err);
        console.log(err)
    })
})

paymentRouter.route('/paytm')
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.send(req.body);
  var paytmParams = {};
  paytmParams["MID"]     = config.paytm.mid;
  paytmParams["ORDERID"] = req.body.oid;
  console.log("?")
  /*
  * Generate checksum by parameters we have
  * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
  */
  PaytmChecksum.generateSignature(paytmParams, config.paytm.mkey).then(function(checksum){

      paytmParams["CHECKSUMHASH"] = checksum;

      var post_data = JSON.stringify(paytmParams);

      var options = {

          /* for Staging */
          hostname: 'securegw-stage.paytm.in',

          /* for Production */
          // hostname: 'securegw.paytm.in',

          port: 443,
          path: '/order/status',
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Content-Length': post_data.length
          }
      };

      var response = "";
      var post_req = https.request(options, function(post_res) {
          post_res.on('data', function (chunk) {
              response += chunk;
          });

          post_res.on('end', function(){
              console.log('Response: ', response);
          });
      });

      post_req.write(post_data);
      post_req.end();
      res.send(response);
  });      
})

module.exports = paymentRouter;