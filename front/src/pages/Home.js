import React, {Component} from 'react';
import DisplayProducts from '../Components/DisplayProducts';
import Header from '../Components/Header';

  export class Home extends Component {

      render() {
        return (
            <div>  
                <Header />
                <DisplayProducts />
            </div>
        )
      }
    } 

export default Home;