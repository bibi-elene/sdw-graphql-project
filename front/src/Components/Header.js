import React, {Component} from 'react';
import Categories from './categories'
import Currencies from './currencies';
import {connect} from 'react-redux';

class Header extends Component {
    render() {
        return (
            <>
            <Categories />
            <Currencies />
            <h1 style={{margin: "20px "}}>{this.props.category}</h1>
            </>
        )
    }
}

function mapStateProps(state){
    return{
        category: state.category
    };
}


export default connect(mapStateProps)(Header);
