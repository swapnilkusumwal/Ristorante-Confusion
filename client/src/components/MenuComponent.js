import React from "react";
import { Card, Breadcrumb,BreadcrumbItem, Button,Row,Col} from "reactstrap";
import {Link } from 'react-router-dom';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {LocalForm,Control} from 'react-redux-form';

function Menu(props){
    function handleSubmit({quantity=1},dishid,name,price,image){
        var obj={quantity:parseInt(quantity),dishid:dishid,name:name,price:price/100,image:image};
        // console.log(obj);
        props.postCart(obj);
    }
    function RenderMenuItem({dish}){
        return (
            <Card>
                <div className="col-12">
                    <Link to={`/menu/${dish._id}`}>
                        <div className="col-3 inn">
                            <img src={baseUrl+dish.image} height="150"  alt={dish.name} />
                        </div>
                        <div className="col-7 inn" style={{color:"black"}}>
                            <h4>{dish.name}</h4>
                            <p>{dish.description}</p>
                            <p>Rs.{dish.price/100}</p>
                        </div>
                    </Link>
                    <div className="col-2 inn">
                    <LocalForm onSubmit={(values)=>handleSubmit(values,dish._id,dish.name,dish.price,dish.image)}>
                        <Row className="form-group">
                            <Col md={{size:8,offset:0}}>
                                <Control.select model=".quantity" className="form-control"
                                    name="quantity" >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Button type="submit" color="primary" style={{borderRadius:"50%"}} >Add/Update</Button>
                    </LocalForm>
                    </div>
                </div>
                
            </Card>
        );
    }

    
        const menu = props.dishes.dishes.map((dish,index) => {

            return (
                <div key={dish._id} className="col-12 m-1">
                    <RenderMenuItem dish={dish} index={index}/>
                </div>
            );
        });

        if(props.isLoading){
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
        else{
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to='/home'>Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                Menu
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Menu</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row mb-1">
                        {menu}
                    </div>
                </div>
            );
        }
    };



export default Menu;