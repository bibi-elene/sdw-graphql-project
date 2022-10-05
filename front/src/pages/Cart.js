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


class Cart extends Component {
    render() {
        return(
            console.log('success')
        )
    }
}

export default Cart;