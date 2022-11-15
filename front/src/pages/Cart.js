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
                            <div>
                            <h1>{x.brand}</h1> 
                            <h1>{x.name}</h1> 
                            <p>
                                {x.prices}
                                </p> 
                {x.attributes.map(({type, name, items, id}) => (
                <div key={id} id="attributes" style={{padding: "5px"}}> 
                <span style={{fontWeight: "600", fontFamily: "Roboto Condensed"}}> {name}: </span> 
                <br /> 
                {items.map(({value, id, displayValue}) => (
                  <div
                      key={value} 
                      style={{
                        display: "inline-flex", 
                        textAlign: "center", 
                        alignItems: "center", 
                        justifyContent: "center",
                      }}
                      > 
                  <a
                  type={type}
                  name={name}
                  className={type}
                  id={id}
                  style={{
                    backgroundColor: type !== "swatch" && x.selected.map(x => x).includes(id) ? "black" : value, 
                    border: type == 'swatch' && x.selected.map(x => x).includes(id) ? "2px solid green" : type !== "swatch" ? "1px solid black" : localStorage.getItem('border'), 
                    width: type == 'swatch' ? "14px" : "8px", 
                    height: type == 'swatch' ? "14px" : "8px", 
                    fontSize: "7px", 
                    fontWeight: "400", 
                    margin: "5px 4px 7px 0",
                    padding: type == 'swatch' ? "0" : "10px",
                    color: x.selected.map(x => x).includes(id) ? "white" : "black"
                  }}
                  value={value} 
                  >
                   {type == 'swatch' ? " " : value}
                   {x.selected.forEach(x => x)}
                    </a>
                  </div>
                ))} 

                </div>
              ))}
                            <div>
                            <button onClick={() => this.props.dispatch({type: "INCREASE", payload: x})}> + </button> 
                            <button onClick={() => this.props.dispatch({type: "DECREASE", payload: x})}> - </button>
                            <h1> {x.quantity} </h1>   
                            </div>                                
                            </div> 
                            <div>
                                <img src={x.gallery} width="100"></img>
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