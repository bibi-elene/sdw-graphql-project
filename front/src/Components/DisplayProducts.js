import React, {Component} from 'react';
import { Query } from "@apollo/client/react/components";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

//<p>inStock: {item.inStock ? "true" : "false"}</p> 

export class DisplayProducts extends Component {
  
render(){


    return ( 

        <Query key={"key"} query={this.props.queryType}>

        {({ loading, error, data }) => {
            if (loading) return 'Loading ...';
            if (error) return console.log(error);
            if (data.category === undefined) return null;

    return data.category.products.map(( item, index) => (
    <section key={index}  className='products-section' style={{width: "100%"}}>  
      <div className='products-div'>
        <Link to={`/${item.id}`} style= {{color: "black"}}>
        <img src={item.gallery[0]}></img>
        <p>{item.brand} {item.name} </p>
        <p>
          {item.prices.map(({amount, currency}) => 
          (<span key={currency.label}>
          { currency.symbol == this.props.currency ? currency.symbol + amount : null}<br/>
          </span>))
          }
        </p> 
        <br />
      </Link>
      <button onClick={() => this.props.dispatch({type: "ADD_CART", payload: item})}>Add</button>
      <button onClick={(() => console.log(this.props.cart))}>See</button>
      </div>
      </section>
    ))
    }}
        </Query>
    )}
  }

  const mapStateProps = state => {
    return {
        currency: state.currency,
        queryType: state.queryType,
        cart: state.cart,
    };
  }





  export default connect(mapStateProps)(DisplayProducts);