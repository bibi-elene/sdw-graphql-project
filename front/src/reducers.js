import {legacy_createStore as createStore} from 'redux';
import { GET_All_PRODUCTS } from './Components/Queries';
import { GET_CLOTHES } from './Components/Queries';
import { GET_TECH } from './Components/Queries';

const changeCurrency = () => {
  return {
    type: "CHANGE_CURRENCY"
  }
}

const changeCategory = () => {
  return {
    type: "CHANGE_CATEGORY"
  }
}

const initialState = {
    currency: "",
    category: "",
    cart: [],
    queryType: GET_All_PRODUCTS
  }
  
  const reducer = (state = initialState, action) => {
    switch(action.type) {
      case "$":
        return {...state, currency: state.currency = "$"};
  
      case "£":
        return {...state, currency: state.currency = "£"};
  
      case "A$":
        return {...state, currency: state.currency = "A$"};
  
      case "¥":
        return {...state, currency: state.currency = "¥"};
  
      case "₽":
        return {...state, currency: state.currency = "₽"};

      case "ALL":
        return {...state, category: state.category = "ALL", queryType: state.queryType = GET_All_PRODUCTS};
      
      case "CLOTHES":
        return {...state, category: state.category = "CLOTHES", queryType: state.queryType = GET_CLOTHES};
      
      case "TECH":
        return {...state, category: state.category = "TECH", queryType: state.queryType = GET_TECH};
      
      case "ADD_TO_CART":
        return {...state, cart: state.cart = []}
      
      default: 
        return {
            currency: state.currency = "$",
            category: state.category = "ALL",
            queryType: state.queryType = GET_All_PRODUCTS,
            cart: state.cart = []
            };
    }
  }
  
  export const store = createStore(reducer);

  

