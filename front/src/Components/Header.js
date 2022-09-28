import {GET_CATEGORY} from './Queries';
import React, {Component} from 'react';
import { Query } from "@apollo/client/react/components";
import {Link} from 'react-router-dom';
import Categories from './categories'
import Currencies from './currencies';

export class Header extends Component {
    render() {
        return (
            <>
            <Categories />
            <Currencies />
            </>
        )
    }
}

export default Header;