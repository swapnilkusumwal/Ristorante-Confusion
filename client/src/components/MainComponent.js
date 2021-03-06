import React, { Component } from 'react';
import Menu from "./MenuComponent";
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Favorite from './FavoriteComponent';
import Cart from './CartComponent';
import Payment from './PaymentComponent';
import {Switch , Route, Redirect , withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { postComment, postFeedback, fetchDishes, fetchComments, fetchPromos, fetchLeaders, loginUser, signupUser, logoutUser, fetchFavorites, postFavorite, deleteFavorite, postCart, fetchCart, deleteCart} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
const mapStateToProps = state =>{
    return{
        dishes: state.dishes,
        comments:state.comments,
        promotions:state.promotions,
        leaders:state.leaders,
        favorites: state.favorites,
        auth: state.auth,
        cart: state.cart
    }
}

const mapDispatchToProps =(dispatch) =>({
  postComment:(dishId,rating,author,comment)=>dispatch(postComment(dishId,rating,author,comment)),
  postFeedback:(firstname,lastname,telnum,email,agree,contactType,message)=>dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message)),
  fetchDishes:()=>{dispatch(fetchDishes())},
  resetFeedbackForm:()=>{dispatch(actions.reset('feedback'))},
  fetchComments:()=>{dispatch(fetchComments())},
  fetchPromos:()=>{dispatch(fetchPromos())},
  fetchLeaders:()=>{dispatch(fetchLeaders())},
  fetchFavorites: () => dispatch(fetchFavorites()),
  loginUser: (creds) => dispatch(loginUser(creds)),
  signupUser: (creds) => dispatch(signupUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
  postCart: (cart) => dispatch(postCart(cart)),
  deleteCart: (dishId) => dispatch(deleteCart(dishId)),
  fetchCart: () => dispatch(fetchCart())
});

class Main extends Component {
  
  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    this.props.fetchFavorites();
    this.props.fetchCart();
  }

  render(){
  const HomePage = () =>{
      return(
          <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured )[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured )[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured )[0]}
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}/>
      );
  }  

const DishWithId = ({match}) => {
      if(this.props.favorites.favorites!=null){
        if(Array.isArray(this.props.favorites.favorites))
        this.props.favorites.favorites=this.props.favorites.favorites[0];
      }
      return(
        (this.props.auth.isAuthenticated && !this.props.favorites.isLoading && this.props.favorites.favorites!==undefined && this.props.favorites.favorites!==null)
        ?
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dish === match.params.dishId)}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
          favorite={this.props.favorites.favorites.dishes.some((dish) => dish._id === match.params.dishId)}
          postFavorite={this.props.postFavorite}
          />
          :
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dish === match.params.dishId)}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
          favorite={false}
          postFavorite={this.props.postFavorite}
          />
      );
    }

    const PrivateRoute=({component:Component,...rest})=>(
      <Route {...rest} render={(props)=>(
        this.props.auth.isAuthenticated
        ? <Component{...props}/>
        :<Redirect to={{
          pathname:'/home',
          state:{from:props.location}
        }} />
      )} />
    );

  const Leader = () =>{
      return(
        <About leaders={this.props.leaders}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}/>
      );
  };

  return (
    <div>
        <Header auth={this.props.auth} 
          loginUser={this.props.loginUser} 
          signupUser={this.props.signupUser} 
          logoutUser={this.props.logoutUser} 
          /> 
        <TransitionGroup >
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch location={this.props.location}>
                  <Route path='/home' component={HomePage} />
                  <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} postCart={this.props.postCart} />} />
                  <Route path='/menu/:dishId' component={DishWithId}/>
                  <PrivateRoute exact path="/favorite" component={() => <Favorite favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite} />} />

                  <Route path='/carts' component={()=><Cart dishes={this.props.cart} deleteCart={this.props.deleteCart} isLoading={this.props.cart.isLoading}/>}/>
                  <Route exact path='/contactus' component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>} />
                  <Route path='/aboutus' component={Leader}/>
                  <Route path='/payments' component={Payment}/>
                  <Redirect to="/home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        <Footer />
    </div>
  );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
