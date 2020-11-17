import React,{Component} from "react";
import { Card, CardImg, CardBody,CardText, CardTitle,
        Breadcrumb,BreadcrumbItem,Button,Modal,ModalBody,
        ModalHeader,Row,Col,Label, CardImgOverlay} from "reactstrap";
import {Control , LocalForm } from 'react-redux-form';
import {Link } from 'react-router-dom';
import {Loading} from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl';
import {FadeTransform,Fade,Stagger} from 'react-animation-components';

// changeTime(date){
    //     return new Date(date).toLocaleDateString("en-US",{
    //         year:"numeric",
    //         month:"short",
    //         day:"numeric"
    //     });
    // }

    // const minLength=(len)=>(val)=>(val) && ((val.length)>=len);
    // const maxLength=(len)=>(val)=>!(val) || ((val.length)<=len);
    class CommentForm extends Component{
        constructor(props){
            super(props);
            this.state={
                isModalOpen:false
            }
            this.toggleModal=this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        handleSubmit(values){
            this.toggleModal();
            this.props.postComment(this.props.dishId,values.rating,values.author,values.comment);
        }

        render(){
            return(
                <div>
                    <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span>Submit Comment</Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col md={{size:12,offset:0}}>
                                    <Label htmlFor="rating">
                                        Rating
                                    </Label>
                                </Col>
                                <Col md={{size:12,offset:0}}>
                                    <Control.select model=".rating" className="form-control"
                                        name="crating" >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            {/* <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="author" >Your Name</Label>
                                </Col>
                                <Col md={12}>
                                    <Control.text model=".author" className="form-control"
                                    name="author" id="author" placeholder="Your Name"
                                    validators={{
                                        minLength:minLength(2),maxLength:maxLength(15)
                                    }} / >
                                    <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        minLength:'Must be greater than 2 characters',
                                        maxLength:'Must be 15 characters or less'
                                    }}/>
                                </Col>
                            </Row> */}
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="comment" >Comment</Label>
                                </Col>
                                <Col md={12}>
                                    <Control.textarea model=".comment" className="form-control"
                                    name="comment" id="comment" rows="6"/ >
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary" >Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                    </Modal>
                </div>
            )};
        
    }

    function RenderDish({dish,favorite,postFavorite}){
        if (dish!=null){
            return(
                <FadeTransform in
                transformProps={{
                    exitTransform:'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <Button outline color="primary" onClick={()=>favorite ? console.log('Already favorite'):postFavorite(dish._id)}>
                            {favorite?
                                <span className="fa fa-heart"></span>
                                :
                                <span className="fa fa-heart-o"></span>
                            }
                            </Button>
                        </CardImgOverlay>
                        <CardBody>
                            <CardTitle className="navbar-brand">{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            )
        }
        else{
            return(
                <div>
                </div>
            )
        }
    }
    function RenderComment({comments,postComment,dishId}){
        if(comments!=null){
            let list= comments.map((comments) =>{
                let date=comments.createdAt;
                return (
                    <Fade in>
                        <li key={comments._id}>
                            <div>
                                <p>{comments.comment}</p>
                                <p>-- {comments.author.firstname} {comments.author.lastname} , {new Intl.DateTimeFormat('en-US' , {year :'numeric', month: 'short',day:'2-digit' }).format(new Date(Date.parse(date)))}</p>
                            </div>
                        </li>
                    </Fade>
                );
            });
            return(
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        <Stagger in>
                            {list}
                        </Stagger>
                    </ul>
                    <CommentForm dishId={dishId} postComment={postComment}/>
                </div>
            )
        }
        else{
            return(
                <div>
                    
                </div>
            )
        }
    }
    const DishDetail= (props) => {
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading/>
                    </div>
                </div>
            );
        }
        else if(props.errMess){
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        }
        else if(props.dish!=null){
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to='/menu'>Menu</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                {props.dish.name}
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish}
                                postFavorite={props.postFavorite}
                                dishId={props.dish._id}
                                favorite={props.favorite} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComment comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish._id}/ >
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div>
                </div>
            )
        }
    }


export default DishDetail;