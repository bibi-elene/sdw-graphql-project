import {GET_CATEGORY} from './Queries';
import React, {Component} from 'react';
import { Query } from "@apollo/client/react/components";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

export class Categories extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (e) => {
        this.props.dispatch({type: e.target.innerHTML});
        console.log(e.target.innerHTML, this.props)
    }

    render() {
        return (
            <Query key="key" query={GET_CATEGORY}>
                {({ loading, error, data }) => {
            if (loading) return 'Loading ...';
            if (error) return console.log(error);
            if (data.categories === undefined) return null;

            return data.categories.map((item, index) => (
            <section key={index} style={{display: "inline-block", margin: "40px 10px"}}>
                <Link onClick={this.handleChange} id="header" style={{padding: "0 10px"}} to={item.name == 'all' ? '/' : `/${item.name}`}>{item.name.toUpperCase()}</Link>
            </section>
            ))
                }}
            </Query>
                
        )
    }
}

function mapStateProps(state){
    return{
        category: state.category
    };
}

export default connect(mapStateProps)(Categories);
