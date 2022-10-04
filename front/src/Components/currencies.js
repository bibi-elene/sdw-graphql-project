import {GET_CURRENCY} from './Queries';
import React, {Component} from 'react';
import { Query } from "@apollo/client/react/components";
import {connect} from 'react-redux';

export class Currencies extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (e) => {
        this.props.dispatch({type: e.target.value[0] == "A" ? "A$" : e.target.value[0]});
    }

    render() {
        return (
            <Query key="key" query={GET_CURRENCY}>
                {({ loading, error, data }) => {
            if (loading) return 'Loading ...';
            if (error) return console.log(error);
            if (data.currencies === undefined) return null;
           
            
        return (
         <section className='header' style={{float:"right", position: "absolute", right: "0", top: "0"}}> 
            <select defaultValue={this.props.currency} onChange={this.handleChange}>
                <option value={this.props.currency} disabled hidden>{this.props.currency}</option>
                {data.currencies.map((item, index) => (
                    <option key={index}> {item.symbol + ' ' + item.label} </option>
                ))}
            </select>
            </section>  
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