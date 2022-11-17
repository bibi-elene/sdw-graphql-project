import React, {Component} from 'react';
import { Query } from "@apollo/client/react/components";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../whiteCart.png';

/*
      
*/

export class DisplayProducts extends Component {
  
render(){

  window.onbeforeunload = () => {
    localStorage.setItem(this.props.cart, this.props.cart)
  }

    return ( 

        <Query key={"key"} query={this.props.queryType}>

        {({ loading, error, data }) => {
            if (loading) return 'Loading ...';
            if (error) return console.log(error);
            if (data.category === undefined) return null;

    return (
      <>
      <h1 style={{position: "absolute", left: "10%", top: "10%", fontSize: "42px"}}>{this.props.category}</h1>
      {data.category.products.map(( item, index) => (
    <section key={index}  className='products-section' style={{width: "100%"}}>  
      <div className='products-div'>
        <Link to={`/${item.id}`} style= {{color: "black"}}>
        <div className='products'>
        <img style={{opacity: item.inStock ? 1 : 0.3}} src={item.gallery[0]}></img>
        <p>{item.brand} {item.name} </p>
        <p>
          {item.prices.map(({amount, currency}) => 
          (<span key={currency.label}>
          { currency.symbol == this.props.currency ? currency.symbol + amount : null}<br/>
          </span>))
          }
        </p> 
        </div>
        </Link>
        {item.inStock && item.attributes.length == 0
        ? 
        <button onClick={() => this.props.dispatch({type: "ADD_CART", payload: item, plp: false})} className="btn-add"><img src={logo} ></img></button>
        : !item.inStock ?
        <p>.</p>
        : 
        <button onClick={() => this.props.dispatch({type: "ADD_CART", payload: item, plp: true})} className="btn-add"><img src={logo} ></img></button>}       
        </div>
      </section>
    ))} </>
    )
    }}
        </Query>
    )}
  }

  const mapStateProps = state => {
    return {
        category: state.category,
        currency: state.currency,
        queryType: state.queryType,
        cart: state.cart,
    };
  }





  export default connect(mapStateProps)(DisplayProducts);