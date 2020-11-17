const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("../authenticate");
const Carts = require("../models/carts");
const cors = require("./cors");
const cartRouter = express.Router();

cartRouter.use(bodyParser.json());

cartRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Carts.find({user:req.user._id})
      .then(
        (cart) => {
          // console.log(cart);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(cart);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Carts.findOne({ user: req.user._id })
      .then(
        (cart) => {
          if (cart === null) {

          // console.log("fjgfjhfjfjhfhjfjf");
            let obj = {};
            obj.dishid = req.body.dishid;
            obj.name = req.body.name;
            obj.price = req.body.price;
            obj.quantity = req.body.quantity;
            obj.image=req.body.image;
            console.log(req.body);
            console.log(obj);
            let arr=[];
            arr.push(obj);
            Carts.create({ user: req.user._id, dishes: arr })
              .then(
                  (cart1) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    console.log(cart1);
                    res.send(cart1);
                  },
                  (err) => next(err)
                )
              .catch((err) => next(err));
          } else {
              let idx=-1;
              for(let i=0;i<cart.dishes.length;i++){
                if(cart.dishes[i].dishid==req.body.dishid){
                  idx=i;
                  break;
                }
              }
              if ( idx === -1) {
                let obj = {};
                obj.dishid = req.body.dishid;
                obj.name = req.body.name;
                obj.price = req.body.price;
                obj.quantity = req.body.quantity;
                obj.image=req.body.image;
                cart.dishes.push(obj);
              }
              else{
                cart.dishes[idx].quantity=req.body.quantity;
              }
            cart
              .save()
              .then(
                (cart) => {
                        // console.log(cart);
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.send(cart);
                      },
                      (err) => next(err)
                    )
                    .catch((err) => next(err));
                }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.send("PUT not supported on /cart");
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.send("DELETE not supported on /cart");
  });

cartRouter
  .route("/:cartId")
  .options(cors.corsWithOptions, (req, res) => {
    console.log("ASDS");
    res.sendStatus(200);
  })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Carts.findOne({ user: req.user._id })
      .then(
        (cart) => {
          if (!cart) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ exists: false, cart: cart });
          } else {
            if (cart.dishes.indexOf(req.params.dishId) < 0) {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json({ exists: false, cart: cart });
            } else {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json({ exists: true, cart: cart });
            }
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.send("POST not supported on /cart/:cartId");
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.send("PUT not supported on /cart/:cartId");
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Carts.findOne({ user: req.user._id })
      .then(
        (cart) => {
          if (cart) {
            let idx=-1;
            for(let i=0;i<cart.dishes.length;i++){
              if(cart.dishes[i].dishid==req.params.cartId){
                idx=i;
                break;
              }
            }
            if (idx !== -1) {
              cart.dishes.splice(idx, 1);
              cart
                .save()
                .then(
                    (cart1) => {
                      res.statusCode = 200;
                      res.setHeader("Content-Type", "application/json");
                      res.json(cart1);
                    },
                    (err) => next(err)
                  )
                  .catch((err) => next(err)
                );
              
            } else {
              err = new Error("Dish " + req.params.cartId + " not found");
              err.status = 404;
              return next(err);
            }
          } else {
            err = new Error("Cart does not exist");
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });
module.exports = cartRouter;
