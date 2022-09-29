
import {legacy_createStore as createStore} from 'redux';

const currencyState = {
    currency: "",
    category: ""
  }
  
  const reducer = (state = currencyState, action) => {
    switch(action.type) {
      case "$":
        return {...state, currency: state.currency = "$"};
  
      case "£":
        return {...state, currency: state.currency = "£"};
  
      case "A":
        return {...state, currency: state.currency = "A"};
  
      case "¥":
        return {...state, currency: state.currency = "¥"};
  
      case "₽":
        return {...state, currency: state.currency = "₽"};

      case "ALL":
        return {...state, category: state.category = "ALL"};
      
      case "CLOTHES":
        return {...state, category: state.category = "CLOTHES"};
      
      case "TECH":
        return {...state, category: state.category = "TECH"};
  
      default: 
        return {
            currency: state.currency = "$",
            category: state.category = "ALL"
            };
    }
  }
  
  export const store = createStore(reducer);

  

