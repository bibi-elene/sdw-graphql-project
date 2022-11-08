import React, {Component} from 'react';
import { Query } from "@apollo/client/react/components";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from '../Components/withRouter';
import Header from '../Components/Header';
import { GET_PRODUCT } from '../Components/Queries';

// Images, brand, name, attributes =>  name, items => value (sizes, colors), price, addToCart button

//<p>inStock: {item.inStock ? "true" : "false"}</p>

class Product extends Component {
  constructor(props){
    super(props);
    this.state = {
      gallery: '',
    }
  }
render(){
    // for product query
    const id = this.props.params.id;

    const changePhoto = (e) => {
      this.setState({gallery: e.target.src});
    }

    const changeSelect = (e) => {
      this.setState({selected: e.target.value})
    }

    localStorage.setItem('selectedClass', 'selected');
    localStorage.setItem('noSelectedClass', 'no-selected');

    const selectFunction = (e) => {
      this.props.cartItem.selected = e.target.value;
      let allAttributes = document.querySelectorAll(`.${e.target.className}`);

      allAttributes.forEach(x => e.target.id == x.id ? 
        Object.assign(e.target.style, {backgroundColor: "black", color: "white"})
      : Object.assign(x.style, {backgroundColor: "white", color: "black"})

        )

        console.log(e.target.id)
    }


    // parse description from html to text
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
      <div className='product-section' style={{alignItems: "start", position: "absolute", width: "100%", display: "flex", marginTop: "5%", marginLeft: "12%", maxWidth: "80vw"}}>
        
          <div className='product-div' style={{overflow: "scroll", height: "600px", width: "100%"}}>
            {data.product.gallery.map((x) => (
              <a style={{ display: "absolute", width:"100%", float: "left", padding: "10px 0"}} key={x}>
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

          <div className='product-details' style={{ width: "100%", textAlign: "start"}}>
            <h1 style={{fontWeight: "600"}}> {data.product.brand} </h1>
            <p style={{fontWeight: "400"}}> {data.product.name}</p>
              {data.product.attributes.map(({name, items, id}) => (
                <div key={id} id="attributes" style={{padding: "5px"}}> 
                <span style={{fontWeight: "600", fontFamily: "Roboto Condensed"}}> {name}: </span> 
                <br /> 
                {items.map(({value, id}) => (
                  <div
                      key={id} 
                      style={{
                        display: "inline-flex", 
                        textAlign: "center", 
                        alignItems: "center", 
                        justifyContent: "center",
                      }}
                      > 

                  <button
                  className={name}
                  style={{
                    backgroundColor: value.startsWith("#") ? value : "white", 
                    border: value.startsWith("#") ? "1px solid #bbbbbb" : "1px solid #1D1F22", 
                    width: value.startsWith("#") ? "32px" : "63px", 
                    height: value.startsWith("#") ? "32px" : "45px", 
                    fontSize: "16px", 
                    fontWeight: "400", 
                    margin: "10px 8px 15px 0",
                    padding: value.startsWith("#") ? "0" : "20px"
                  }}
                  id={id} 
                  value={value} 
                  onClick={selectFunction}
                  >
                    {value.startsWith("#") ? " " : value }
                    </button>
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
            <div style={{marginTop: "5vw"}}>
              <button className="btn-product"
              style={{
              backgroundColor: "#5ECE7B", 
              padding: "16px 32px", 
              border: "none", 
              color: "white", 
              fontWeight: "600"}} 
              onClick={() => this.props.dispatch({type: "ADD_CART", payload: data.product})}>
                ADD TO CART
              </button>
            </div>
            <p style={{marginTop: "20px", width: "auto", maxWidth: "80%", fontFamily: "Roboto Condensed", fontWeight: "400", lineHeight: "16px"}}>{parseStr(data.product.description)}</p>
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
        currency: state.currency,
        cartItem: state.cartItem
    };
}

  export default connect(mapStateProps)(withRouter(Product));