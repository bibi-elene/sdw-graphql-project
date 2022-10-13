import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from '../Components/Header';


/* 
<img width="100" src={x.gallery[0]}></img>
<h1>{x.brand}</h1>

*/

export class Cart extends Component {
  
    render(){
    if (this.props.cart[0] !== undefined) {   
        return (
            <section>
                <Header />
                <div style={{margin: "300px", fontSize: "10px"}}>
                    {this.props.cart.map((x, index) => (
                        <div key={index} style={{marginBottom: "20px", borderBottom: "1px solid red"}}>
                        <h1>{x.brand}</h1> 
                        <h1>{x.name}</h1>     
                        <div>
                        <button onClick={() => this.props.dispatch({type: "INCREASE", payload: x})}> + </button> 
                        <button onClick={() => this.props.dispatch({type: "DECREASE", payload: x})}> - </button>
                        <h1> {x.quantity} </h1>                                   
                        </div>      
                        </div>
                    ))}
                </div>
            </section>
        ) 
    } else {
        return <div> Empty Cart</div>
    }
        }
      }
    
      function mapStateProps(state){
        return {
            currency: state.currency,
            queryType: state.queryType,
            cart: state.cart
        };
    }
    
      export default connect(mapStateProps)(Cart);