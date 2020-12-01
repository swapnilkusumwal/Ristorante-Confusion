import React,{Component} from 'react';
import { Navbar, NavbarBrand, Jumbotron, Nav,NavbarToggler,Collapse,NavItem,
        Modal,Button,ModalHeader,ModalBody, Input , Form,FormGroup,Label} from 'reactstrap';
import { NavLink } from 'react-router-dom';
 
class Header extends Component{

    constructor(props){
        super(props); 
        this.state={
            isNavOpen:false,
            isModalOpen:false,
            isModalOpenSignUp:false
        }
        this.toggleNav= this.toggleNav.bind(this);
        this.toggleModal= this.toggleModal.bind(this);
        this.toggleModalSignUp= this.toggleModalSignUp.bind(this);
        this.handleLogin= this.handleLogin.bind(this);
        this.handleSignUp= this.handleSignUp.bind(this);
        this.handleLogout= this.handleLogout.bind(this);
    }

    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    toggleModalSignUp(){
        this.setState({
            isModalOpenSignUp: !this.state.isModalOpenSignUp
        });
    }

    handleLogin(event){
        this.toggleModal();
        console.log("username: "+this.username.value +" password: "+this.password.value);
        this.props.loginUser({username: this.username.value, password: this.password.value});
        event.preventDefault();
    }
    handleSignUp(event){
        this.toggleModalSignUp();
        this.props.signupUser({username: this.username.value, password: this.password.value,firstname:this.firstname.value,
            lastname:this.lastname.value
        });
        event.preventDefault();
    }
    handleLogout() {
        this.props.logoutUser();
    }

    render(){
        return(
        <React.Fragment>
            <Navbar dark expand="md">
                <div className="container">
                    <NavbarToggler onClick={this.toggleNav} />
                    <NavbarBrand href="/" className="navbar-brand mr-auto">
                        <img src='assets/images/logo.png' height="30" width="41" alt="Ristorante Con Fusion" />
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to="/home">
                                    <span className="fa fa-home fa-lg"></span>Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/aboutus">
                                    <span className="fa fa-info fa-lg"></span>About Us
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/menu">
                                    <span className="fa fa-list fa-lg"></span>Menu
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/favorite">
                                    <span className="fa fa-heart fa-lg"></span> My Favorites
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink className="nav-link" to="/contactus">
                                    <span className="fa fa-address-card fa-lg"></span>Contact Us
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/carts">
                                    <span className="fa fa-shopping-cart fa-lg"></span>Cart
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                {!this.props.auth.isAuthenticated?
                                    <div style={{display:'flex',flexDirection:'row'}}>
                                    <Button outline onClick={this.toggleModal}>
                                        <span className="fa fa-sign-in fa-lg"></span>Login
                                        {this.props.auth.isFetching ?
                                            <span className="fa fa-spinner fa-pulse fa-fw"></span>    
                                            :null
                                        }
                                    </Button>
                                    <div style={{marginLeft:5}}>
                                    <Button outline onClick={this.toggleModalSignUp}>
                                    <span className="fa fa-sign-in fa-lg"></span>Sign Up
                                    {this.props.auth.isFetching ?
                                        <span className="fa fa-spinner fa-pulse fa-fw"></span>    
                                        :null
                                    }
                                    </Button>
                                    </div>
                                    </div>
                                    :
                                    <div>
                                        <div className="navbar-text mr-3">{this.props.auth.user.username}</div>
                                        <Button outline onClick={this.handleLogout}>
                                            <span className="fa fa-sign-out fa-lg"></span> Logout
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                    </div>
                                }
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>Ristorante Con Fusion</h1>
                            <p>We take inspiration from the World's 
                                best cuisines, and create a unique 
                                fusion experience. Our lipsmacking 
                                creations will tickle your culinary 
                                senses!</p>    
                        </div>
                    </div>
                </div>
            </Jumbotron>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleLogin}>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" id="username" name="username"
                            innerRef={(input) => this.username=input}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password"
                            innerRef={(input) => this.password=input}/>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" name="remember"
                                innerRef={(input) => this.remember=input}/>
                                Remember me
                            </Label>
                        </FormGroup>
                        <Button type="submit" value="submit" className="bg-primary">Login</Button>
                    </Form>
                </ModalBody>
            </Modal>
            <Modal isOpen={this.state.isModalOpenSignUp} toggle={this.toggleModalSignUp}>
                <ModalHeader toggle={this.toggleModalSignUp}>Sign Up</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleSignUp}>
                        <FormGroup>
                            <Label htmlFor="firstname">First Name</Label>
                            <Input type="text" id="firstname" name="firstname"
                            innerRef={(input) => this.firstname=input}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="lastname">Last Name</Label>
                            <Input type="text" id="lastname" name="lastname"
                            innerRef={(input) => this.lastname=input}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" id="username" name="username"
                            innerRef={(input) => this.username=input}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password"
                            innerRef={(input) => this.password=input}/>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" name="remember"
                                innerRef={(input) => this.remember=input}/>
                                Remember me
                            </Label>
                        </FormGroup>
                        <Button type="submit" value="submit" className="bg-primary">Login</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </React.Fragment>
        );
    }
}
export default Header;