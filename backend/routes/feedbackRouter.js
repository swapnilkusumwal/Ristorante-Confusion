const express = require('express');
const bodyParser = require('body-parser');

const feedbackRouter = express.Router();
var authenticate=require('../authenticate');
var cors=require('./cors');
feedbackRouter.use(bodyParser.json());

feedbackRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.send(req.body);
})

module.exports = feedbackRouter;