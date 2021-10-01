import React, { useState } from 'react';
import { Button, Card } from 'reactstrap';

const Cash=({amount,order})=>{
  order={...order,api:"cash"};
  return(
    <div >
      <Card body className="centerFlex mt-3 mb-3" style={{borderRadius:5,height:"50vh"}}>
      {amount===0?
        <div className="h-20 centerFlex">
          Please add something to cart before proceeding further
        </div>:
        <div>
          <div className="h-20 centerFlex btn btn-primary" onClick={()=>{alert("Your order has been placed!")}}>
            Click here to place order for cash
          </div>
        </div>}
      </Card>
    </div>
  )
}

const Paytm=({amount,order})=>{
  order={...order,api:"paytm"};
  const [tid,setTid]=useState('');
  return(
    <div >
      <Card  className="centerFlex mt-3 mb-3" style={{borderRadius:5,height:"50vh"}}>
      {amount===0?
        <div className="h-20 centerFlex">
          Please add something to cart before proceeding further
        </div>:
        <>
          <h4>Kindly pay Rs.{amount} to 8765516920 on paytm and enter the order ID below</h4>
          <input className="mt-5" placeholder="Transaction ID" value={tid} onChange={(event)=>setTid(event.target.value)}/>
          <div className="h-20 centerFlex btn btn-primary mt-2" onClick={paymentStatus({...order,tid:tid})} >
          Submit
        </div>
        </>
      }
      </Card>
    </div>
  )
}

export default function Payment(props) {
  const [payment,setPayment]=useState(0);
  function cashPayment(){
    setPayment(0);
  }
  function paytm(){
    setPayment(1);
  }
  return (
    <div className="col-12 container">
      <div className="row mb-3 mt-3 centerFlex">
        <div className="col-3">
          <Card body style={{height:"50vh"}}>
            <Button onClick={cashPayment} color="danger">Cash</Button>
            <div className="mt-3"></div>
            <Button onClick={paytm} color="primary">Paytm</Button>  
          </Card>
          <Card body style={{height:"50vh"}}>
            <Button onClick={cashPayment} color="danger">Cash</Button>
            <div className="mt-3"></div>
            <Button onClick={paytm} color="primary">Paytm</Button>  
          </Card>
        </div>
        <div className="col-6 container">
          {payment===0?<Cash amount={props.location.state.amount} order={props.order}/>:<Paytm amount={props.location.state.amount} order={props.order}/>}
        </div>
        <div className="col-3">
          <Card body style={{height:"50vh",display:"flex",justifyContent: 'center',alignItems: 'center'}}>
            Please continue with your payment here.
          </Card>
        </div>
      </div>
    </div>
  );
}