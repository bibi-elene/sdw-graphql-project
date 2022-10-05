import {GET_CLOTHES} from '../Components/Queries';
import React, {Component} from 'react';
import { Query } from "@apollo/client/react/components";
import Header from '../Components/Header';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

export class Clothes extends Component {
  
    render(){
        return ( 
          <>
          <Header />
            <Query key={"key"} query={GET_CLOTHES}>
    
            {({ loading, error, data }) => {
                if (loading) return 'Loading ...';
                if (error) return console.log(error);
                if (data.category === undefined) return null;
    
        return data.category.products.map(( item, index) => (
          <section className='products-section' key={index}  style={{width: "100%"}}>  
          <div className='products-div'>
            <Link to={`/${item.id}`} style= {{color: "black"}}>
        <img src={item.gallery[0]}  width="356px" height="338px"></img>
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
      </div>
          </section>
              
            ))
          }}
        </Query>
        </>
        )}
      }
    
      function mapStateProps(state){
        return{
            currency: state.currency
        };
    }
    
      export default connect(mapStateProps)(Clothes);