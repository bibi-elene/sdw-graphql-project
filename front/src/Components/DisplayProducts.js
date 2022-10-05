import {GET_All_PRODUCTS} from './Queries';
import React, {Component} from 'react';
import { Query } from "@apollo/client/react/components";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

//<p>inStock: {item.inStock ? "true" : "false"}</p> 

export class DisplayProducts extends Component {
  
render(){

    return ( 

        <Query key={"key"} query={GET_All_PRODUCTS}>

        {({ loading, error, data }) => {
            if (loading) return 'Loading ...';
            if (error) return console.log(error);
            if (data.category === undefined) return null;

    return data.category.products.map(( item, index) => (
    <section className='products-section' key={index}  style={{width: "100%"}}>  
      <div className='products-div'>
        <Link to={`/${item.id}`} style= {{color: "black"}}>
        <img src={item.gallery[0]} width="260px" height="270px"></img>
        <p>{item.name} </p>
        <p>
          {item.prices.map(({amount, currency}) => 
          (<span key={currency.label}>
          { currency.symbol == this.props.currency ? currency.symbol + amount : null}<br/>
          </span>))
          }
        </p> 
        <br />
      </Link>
      </div>
      </section>
      
    ))
    }}
        </Query>
    )}
  }

  function mapStateProps(state){
    return {
        currency: state.currency
    };
}

  export default connect(mapStateProps)(DisplayProducts);