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

    const parser = new DOMParser();

    const parseStr = (x) => {
      if ((x === null) || (x === "") || (x === undefined))
        return false;
      else 
        x = x.toString();
        return x.replace( /(<([^>]+)>)/ig, '')
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
      <div style={{alignItems: "start", position: "absolute", width: "100%", display: "flex", marginTop: "15%", marginLeft: "12%", maxWidth: "80vw"}}>

          <div className='product-div'>
            {data.product.gallery.map((x) => (
              <a style={{ display: "absolute", width:"100%", height: "100%", float: "left", padding: "10px 0"}} key={x}>
                <img onClick={changePhoto} width="100" src={x}></img>
              </a>
            ))}
            </div>

          <div className='product-div' style={{ width: "100%", padding: "30px",
            display: this.state.gallery === "" ? "flex" : "none"}}>
            <img style={ {maxWidth: "400px"}} src={data.product.gallery[0]} width="auto"></img>
          </div>
          <div className='product-div' style={{width: "100%", padding: "30px", 
            display: this.state.gallery !== "" ? "flex" : "none"}}>
            <img style={{maxWidth: "400px"}} src={this.state.gallery} width="auto"></img>
          </div>

          <div className='product-div' style={{ width: "100%", textAlign: "start"}}>
            <h1 style={{fontWeight: "600"}}> {data.product.brand} </h1>
            <p style={{fontWeight: "400"}}> {data.product.name}</p>
              {data.product.attributes.map(({name, items, id}) => (
                <div key={id} style={{padding: "5px"}}> 
                <span style={{fontWeight: "600", fontFamily: "Roboto Condensed"}}> {name}: </span> 
                <br /> 
                {items.map(({value, id}) => (
                  <div key={id} 
                    style={{
                      backgroundColor: value, 
                      border: "1px solid #1D1F22", 
                      width: "32px", 
                      height: "32px", 
                      fontSize: "16px", 
                      fontWeight: "400", 
                      display: "inline-flex", 
                      textAlign: "center", 
                      alignItems: "center", 
                      justifyContent: "center",
                      margin: "10px 8px 15px 0",
                      padding: value.startsWith("#") ? "0" : "10px 15px"
                    }}> 
                  {value.startsWith("#") ? " " : value } <br />
                  </div>
                ))} 

                </div>
              ))}
            
            <div>
            <span style={{fontWeight: "600", fontFamily: "Roboto Condensed", marginLeft: "5px"}}> Price: </span> 
            <p>
            {data.product.prices.map(({amount, currency}) => 
            (<span key={currency.label} style={{marginLeft: "6px", marginTop: "15px", fontWeight: "700", fontSize: "20px"}}>
            { currency.symbol == this.props.currency ? currency.symbol + amount : null}<br/>
            </span>))
            }
            </p> 
            </div>
            <div style={{marginTop: "20%", width: "auto", maxWidth: "80%", fontFamily: "Roboto Condensed", fontWeight: "400", lineHeight: "16px"}}>{parseStr(data.product.description)}</div>
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