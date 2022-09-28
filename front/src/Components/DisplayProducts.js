import {GET_All_PRODUCTS} from './Queries';
import React, {Component} from 'react';
import { Query } from "@apollo/client/react/components";
import {connect} from 'react-redux';

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
    <section key={index}  style={{width: "100%"}}>  
      <div style={{margin: "50px", width: "14%", height: "40vh", float: "left", padding: "15px 50px"}}>
        <img src={item.gallery[0]} width="100%" height="200px"></img>
        <p>{item.name} </p>
        <p>
          {item.prices.map(({amount, currency}) => 
          (<span key={currency.label} style={{fontWeight: "900", position: "absolute"}}>
          { currency.symbol[0] == this.props.currency ? currency.symbol + amount : null}<br/>
          </span>))
          }
        </p> 
        <br />
      </div>
      </section>
      
    ))
    }}
        </Query>
    )}
  }

  function mapStateProps(state){
    return{
        currency: state.currency
    };
}

  export default connect(mapStateProps)(DisplayProducts);