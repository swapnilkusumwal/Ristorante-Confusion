import React from 'react';
import {Card,CardImg,CardBody,CardText,CardTitle,CardSubtitle} from 'reactstrap';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {FadeTransform} from 'react-animation-components';
function RenderCard({item,isLoading,errMess}){
    
    if(isLoading || item===undefined){
        return(
            <Loading/>
        );
    }
    else if(errMess)
    {
        return(
            <h4>{errMess}</h4>
        );
    }
    else{
        // console.log("GELL");
        return (
            <FadeTransform in
                transformProps={{
                    exitTransform:'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg src={baseUrl + item.image} alt={item.name}/>
                    <CardBody>
                        <CardTitle className="navbar-brand">{item.name}</CardTitle>
                        {item.designation ?<CardSubtitle><b>{item.designation}</b></CardSubtitle> :null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }
}


function Home(props){
    // console.log("BYEEE");
    // console.log(props);
    return(
        <div className="container">
            <div className="row">
                <div className="row align-items-start">
                    <div className="col-12 col-md m-1">
                        <RenderCard item={props.dish}
                        isLoading={props.dishesLoading}
                        errMess={props.dishesErrMess} />
                    </div>
                    <div className="col-12 col-md m-1">
                        <RenderCard item={props.promotion}
                        isLoading={props.promosLoading}
                        errMess={props.promosErrMess} />
                    </div>
                    <div className="col-12 col-md m-1">
                        <RenderCard item={props.leader}
                        isLoading={props.leadersLoading}
                        errMess={props.leadersErrMess} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;