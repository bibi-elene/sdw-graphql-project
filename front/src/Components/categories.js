import {GET_CATEGORY} from './Queries';
import React, {Component} from 'react';
import { Query } from "@apollo/client/react/components";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import DisplayProducts from './DisplayProducts';

export class Categories extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (e) => {
        this.props.dispatch({type: e.target.innerHTML});
    }


    render() {
        return (
            <Query key="key" query={GET_CATEGORY}>
                {({ loading, error, data }) => {
            if (loading) return 'Loading ...';
            if (error) return console.log(error);
            if (data.categories === undefined) return null;

            return (
                <section className='header' style={{display: "inline-block", float: "left", position: "absolute", left: "2%", top: "0"}}>
                {data.categories.map((item, index) => (
                <Link key={index} className='categories' onClick={this.handleChange} id="header" 
                    style={{padding: "20px 10px", 
                    color: item.name.toUpperCase() == this.props.category ? "#5ECE7B" : "black", 
                    borderBottom: item.name.toUpperCase() == this.props.category ? "1px solid #5ECE7B" : "none", 
                    fontWeight: item.name.toUpperCase() == this.props.category ? "600" : "400",
                    fontSize: "16px"}} 
                    to={'/'}
                    >

                        {item.name.toUpperCase()}

                </Link>
                ))}
            </section>
            
            )
                }}
            </Query>
                
        )
    }
}

function mapStateProps(state){
    return{
        category: state.category,
        queryType: state.queryType
    };
}

export default connect(mapStateProps)(Categories);
