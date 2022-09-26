import {GET_CATEGORY} from './Queries';
import React, {Component} from 'react';
import { Query } from "@apollo/client/react/components";
import {Link} from 'react-router-dom';

export class Header extends Component {
    render() {
        return (
            <Query key="key" query={GET_CATEGORY}>
                {({ loading, error, data }) => {
            if (loading) return 'Loading ...';
            if (error) return console.log(error);
            if (data.categories === undefined) return null;

            return data.categories.map((item, index) => (
            <section key={index} style={{display: "inline-block"}}>
                <Link to={item.name == 'all' ? '/' : `/${item.name}`}><div style={{padding: "0 10px"}}>{item.name.toUpperCase()}</div></Link>
            </section>
            ))
                }}

                 </Query>
        )
    }
}

export default Header;