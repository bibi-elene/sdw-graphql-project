import {GET_All_PRODUCTS} from '../Components/Queries';
import React, {Component} from 'react';
import { Query } from "@apollo/client/react/components";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { gql } from '@apollo/client';
import { withRouter } from '../Components/withRouter';
import Header from '../Components/Header';

// Images, brand, name, attributes =>  name, items => value (sizes, colors), price, addToCart button

//<p>inStock: {item.inStock ? "true" : "false"}</p>

class Product extends Component {
  constructor(props){
    super(props);
    this.state = {
      gallery: ''
    }
  }
render(){
  const id = this.props.params.id;
  const GET_PRODUCT = gql `
      query getProduct($id: String!) {
        product(id: $id) {
          name
          id
          inStock
          gallery
          description
          category
          brand
          attributes {
            name
            id
            items{
              displayValue
              value
              id
            }
          }
          prices{
            currency {
              label
              symbol
            }
            amount
          }
          brand
        }
      }
    `;

    const changePhoto = (e) => {
      this.setState({gallery: e.target.src});
      console.log(this.props)
    }
    return ( 
      <>
        <Header />
        <Query key={"key"} query={GET_PRODUCT} variables={{id}}>

        {({ loading, error, data }) => {
            if (loading) return 'Loading ...';
            if (error) return console.log(error);
            if (data.product === undefined) return null;

    return (
      <div style={{justifyContent: "center", alignItems: "start", position: "absolute", width: "100%", display: "flex", marginTop: "15%", marginLeft: "10%"}}>

          <div style={{ position: "relative"}}>
            {data.product.gallery.map((x) => (
              <a style={{ display: "absolute", width:"100%", height: "100%", float: "left", padding: "10px 0"}} key={x}>
                <img onClick={changePhoto} width="100" src={x}></img>
              </a>
            ))}
            </div>

          <div style={{position: "relative", width: "100%", padding: "0 30px",
            display: this.state.gallery === "" ? "flex" : "none"}}>
            <img style={ {maxWidth: "400px"}} src={data.product.gallery[0]} width="auto"></img>
          </div>
          <div style={{position: "relative", width: "100%", padding: "0 30px", 
            display: this.state.gallery !== "" ? "flex" : "none"}}>
            <img style={{maxWidth: "400px"}} src={this.state.gallery} width="auto"></img>
          </div>

          <div style={{ position: "relative", width: "100%", float:"right"}}>
            <h1> {data.product.brand} </h1>
            <p> {data.product.name}</p>
            <ul>
              {data.product.attributes.map(({name, items, id}) => (
                <li key={id}> {name} : {items.map(({value, id}) => (
                  <div key={id} style={{backgroundColor: value, width: "50px"}}> {value.startsWith("#") ? "." : value } </div>
              ))} 
                </li>
              ))}
            </ul>
            
          </div> 

    </div>
    )
    }}
        </Query>
        </>
        )
    }
}

  function mapStateProps(state){
    return{
        currency: state.currency
    };
}

  export default connect(mapStateProps)(withRouter(Product));