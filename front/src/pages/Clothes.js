import {GET_CLOTHES} from '../Components/Queries';
import React, {Component} from 'react';
import { Query } from "@apollo/client/react/components";

export class Clothes extends Component {
  
    render(){
        return ( 
    
            <Query key={"key"} query={GET_CLOTHES}>
    
            {({ loading, error, data }) => {
                if (loading) return 'Loading ...';
                if (error) return console.log(error);
                if (data.category === undefined) return null;
    
        return data.category.products.map(( item, index) => (
        <section key={index} style={{width: "100%"}}>  
          <div style={{margin: "50px", width: "18%", height: "50vh", float: "left", border: "1px solid grey", padding: "15px 50px"}}>
            <h3>ID : {item.id}</h3>
            <p>Name: {item.name} </p>
            <p>inStock: {item.inStock ? "true" : "false"}</p> 
            <img alt="product-image" src={item.gallery[0]} width="100"></img> 
            <p>Category: {item.category} </p> 
            <p>Brand: {item.brand} </p> 
            <br />
          </div>
          </section>
          
        ))
    }}
        </Query>
        )}
      }
    
      export default Clothes;