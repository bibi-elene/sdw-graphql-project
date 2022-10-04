import React, {Component} from 'react';
import Categories from './categories'
import Currencies from './currencies';
import {connect} from 'react-redux';
import logo from '../a-logo.png';


class Header extends Component {
    render() {
        return (
            <section>
            <Categories/>
            <section style={{ position: "absolute", left: "50%", top: "3%"}}>
                <img src={logo}></img>
            </section>  
            <Currencies/>
            </section>
        )
    }
}

function mapStateProps(state){
    return{
        category: state.category
    };
}


export default connect(mapStateProps)(Header);
