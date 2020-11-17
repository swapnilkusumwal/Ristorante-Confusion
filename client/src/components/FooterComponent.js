import React from 'react';
import {Link} from 'react-router-dom';

function Footer(props){
    return(
    <div className="footer">
        <div className="container">
            <div className="row justify-content-center">             
                <div className="col-3 offset-1 col-sm-3">
                    <h5>Links</h5>
                    <ul className="list-unstyled">
                        <li><Link to="/home" style={{color:"#5e503f"}}>Home</Link></li>
                        <li><Link to="/aboutus" style={{color:"#5e503f"}}>About</Link></li>
                        <li><Link to="/menu" style={{color:"#5e503f"}}>Menu</Link></li>
                        <li><Link to="/contactus" style={{color:"#5e503f"}}>Contact</Link></li>
                    </ul>
                </div>
                <div className="col-5 offset-1 col-sm-3">
                    <h5>Our Address</h5>
                    <address style={{color:"#5e503f"}}>
		              C-2446, Indira Nagar<br />
		              Lucknow, Uttar Pradesh<br />
		              India<br />
		              <i className="fa fa-phone fa-lg"></i>: +91-8765516920<br />
		              <i className="fa fa-envelope fa-lg" ></i>: <a href="mailto:confusion@food.net" >
                         support@ristorante.net</a>
                    </address>
                </div>
                <div className="col-12 col-sm-4 align-self-center">
                    <div className="text-center" style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                        <div style={{marginLeft:5}}>
                            <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                        </div>
                        <div style={{marginLeft:5}}>
                            <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                        </div>
                        <div style={{marginLeft:5}}>
                            <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                        </div>
                        <div style={{marginLeft:5}}>
                            <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                        </div>
                        <div style={{marginLeft:5}}>
                            <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                        </div>
                        <div style={{marginLeft:5,}}>
                            <a className="btn btn-social-icon" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">             
                <div className="col-auto">
                    <p>© Copyright 2018 Ristorante Con Fusion</p>
                </div>
            </div>
        </div>
    </div> 
    );
}

export default Footer;