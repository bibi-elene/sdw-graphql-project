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
                <img src={logo}></img> <span>{this.props.numberCart}</span>
            </Link>
        )
    }

}


function mapStateProps(state){
    return{
        numberCart: state.numberCart
    };
}


export default connect(mapStateProps)(MiniCart);
