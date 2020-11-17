import React from "react";
import { Card, Breadcrumb,BreadcrumbItem,Button} from "reactstrap";
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
function Cart(props){
    var x=0;
    function RenderMenuItem({dish,deleteCart}){
    //   console.log(dish);
        return (
            <Card>
                <div className="col-12">
                    <Link to={`/menu/${dish.dishid}`}>
                        <div className="col-3 inn">
                            <img src={baseUrl+dish.image} height="150"  alt={dish.name} />
                        </div>
                        <div className="col-3 inn" style={{color:"black"}}>
                            <h4>{dish.name}</h4>
                            <p>Rs.{dish.price}</p>
                        </div>
                    </Link>
                    <div className="col-3 inn">
                      <p>{dish.quantity}</p>
                    </div>

                    <div className="col-3 inn">
                      {dish.quantity*dish.price} <Button outline color="danger" onClick={() => deleteCart(dish.dishid)} className="ml-5">
                          <span className="fa fa-times"></span>
                      </Button>
                      
                    </div>
                </div>
                
            </Card>
        );
    }
        

        if(props.isLoading ){
            return(
                <div className="container">
                    <div className="row">
                        <Loading/>
                    </div>
                </div>
            );
        }

        else if(props.dishes.errMess){
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.dishes.errMess}</h4>
                    </div>
                </div>
            )
        }
        else if(props.dishes.cart.length===0){
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to='/home'>Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                Cart
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Cart</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row mb-1">
                    </div>
                </div>
            );
        }
        
        else{

          if(Array.isArray(props.dishes.cart))
            props.dishes.cart=props.dishes.cart[0];
          // if(dish.props.cart)
          
          return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/home'>Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            Cart
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12" style={{display:"flex",flexDirection:"row"}}>
                        <h3>Cart</h3>
                        <div className="col-5"></div>
                        <div className="col-3"><h3>Quantity</h3></div>
                        <div className="col-4"><h3>Total</h3></div>
                    </div>

                    <hr />
                </div>
                <div className="row mb-1">
                  {props.dishes.cart.dishes.map((dish,index) => {
                      return (
                          <div key={dish._id} className="col-12 m-1">
                              <RenderMenuItem dish={dish} index={index} deleteCart={props.deleteCart}/>
                          </div>
                      );
                  })}
                </div>
                <div className="row mb-1">

                  <div className="col-12" style={{display:"flex",flexDirection:"row"}}>
                    <div className="col-9"></div>

                    <div>
                      {props.dishes.cart.dishes.map((dish) => {
                            x+=dish.price*dish.quantity;
                            return true;
                      })}
                      {x}
                    </div>
                  </div>
                </div>
                <div className="row mb-1">
                  <div className="col-12" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <Link to={{
                      pathname: '/payment',
                      state: {
                        amount: x,
                        order:props.dishes.cart.dishes
                      }
                    }} 
                    className="btn btn-primary">Proceed to Pay</Link>
                  </div>
                </div>
          </div>
          );
        }
    };



export default Cart;