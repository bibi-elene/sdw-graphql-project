import React, {Component} from 'react';
import Categories from './categories'
import Currencies from './currencies';
import MiniCart from '../Pages/MiniCart';
import {connect} from 'react-redux';
import logo from '../a-logo.png';


class Header extends Component {
    render() {
        return (
            <section>
            <Categories />
            <section style={{ position: "absolute", left: "50%", top: "3%"}}>
                <img className='shopping-logo' src={logo}></img>
            </section>  
            <Currencies />
            <MiniCart />
            </section>
        )
    }
}

function mapStateProps(state){
    return{
        category: state.category,
        numberCart: state.numberCart
    };
}


export default connect(mapStateProps)(Header);
