import React, {Component} from 'react';
import DisplayProducts from '../Components/DisplayProducts';
import Header from '../Components/Header';
import { connect } from 'react-redux';

  export class Home extends Component {

      render() {
        
        window.onbeforeunload = () => {
          localStorage.setItem('Cart', JSON.stringify(this.props.cart))
          localStorage.setItem('NumberCart', JSON.stringify(this.props.numberCart))
          localStorage.setItem('Currency', JSON.stringify(this.props.currency))
        }

        return (
            <div>  
                <Header />
                <DisplayProducts />
            </div>
        )
      }
    } 
    function mapStateProps(state){
      return {
          currency: state.currency,
          queryType: state.queryType,
          cart: state.cart,
          numberCart: state.numberCart
      };
  }
  
    export default connect(mapStateProps)(Home);

