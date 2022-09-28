import {GET_CURRENCY} from './Queries';
import React, {Component} from 'react';
import { Query } from "@apollo/client/react/components";
import {connect} from 'react-redux';

export class Currencies extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (e) => {
        this.props.dispatch({type: e.target.value[0]});
    }

    render() {
        return (
            <Query key="key" query={GET_CURRENCY}>
                {({ loading, error, data }) => {
            if (loading) return 'Loading ...';
            if (error) return console.log(error);
            if (data.currencies === undefined) return null;
           
            
        return (
            <select defaultValue={'$'} onChange={this.handleChange}>
                <option  value="$" disabled hidden>$</option>
                {data.currencies.map((item, index) => (
                    <option key={index}>{item.symbol + ' ' + item.label} </option>
                ))}
            </select>
            )

                }}
                 </Query>
        )
    }
}

function mapStateProps(state){
    return{
        currency: state.currency
    };
}
export default connect(mapStateProps)(Currencies);