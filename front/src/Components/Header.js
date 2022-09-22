import {GET_CATEGORY} from './Queries';
import React, {Component} from 'react';
import { Query } from "@apollo/client/react/components";

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
                <div style={{padding: "0 10px"}}>{item.name.toUpperCase()}</div>
            </section>
            ))
                }}

                 </Query>

        )
    }
}

export default Header;