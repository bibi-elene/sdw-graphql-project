import {GET_All_PRODUCTS} from '../Components/Queries';
import React, {Component} from 'react';
import { Query } from "@apollo/client/react/components";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { gql } from '@apollo/client';
import { withRouter } from '../Components/withRouter';
import Header from '../Components/Header';
import logo from '../Empty Cart.png';
import Cart from './Cart';

class MiniCart extends Component {

    render(){

        return (
            <Link to="/Cart" className='header' style={{float:"right", position: "absolute", right: "-35px", top: "0"}}>
                <img src={logo}></img> 
                {this.props.numberCart > 0 ?
                <div style={{alignItems: "center"}}>
                    <span style={{background: "black", padding: "2px 8px", borderRadius: "50%", color: "white", position: "absolute", right: "-15px", top: "-10px", fontFamily: "Roboto", fontWeight: "700"}}>
                        {this.props.numberCart}
                        </span>
                    </div> 
                : null}
            </Link>
        )
    }

}


function mapStateProps(state){
    return{
        numberCart: state.numberCart,
        cart: state.cart
    };
}


export default connect(mapStateProps)(MiniCart);
