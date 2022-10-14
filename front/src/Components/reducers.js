import {legacy_createStore as createStore} from 'redux';
import { GET_All_PRODUCTS } from './Queries';
import { GET_CLOTHES } from './Queries';
import { GET_TECH } from './Queries';

const initialState = {
    currency: "",
    category: "",
    cart: [],
    queryType: GET_All_PRODUCTS,
    numberCart: 0
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
      
      case "ADD_CART":
        if(state.numberCart==0){
          let cartItem = {
              id:action.payload.id,
              quantity:1,
              name:action.payload.name,
              brand:action.payload.brand,
              prices: action.payload.prices.map(({amount, currency}) => 
                   currency.symbol == state.currency ? currency.symbol + amount : null
                  ),
                  gallery: action.payload.gallery[0]
          } 
          state.cart.push(cartItem); 
      }
      else{
          let check = false;
          state.cart.map((item,key)=>{
              if(item.id==action.payload.id){
                  state.cart[key].quantity++;
                  check=true;
              }
          });
          if(!check){
              let cartItem = {
                  id:action.payload.id,
                  quantity:1,
                  name:action.payload.name,
                  brand:action.payload.brand,
                  prices: action.payload.prices.map(({amount, currency}) => 
                   currency.symbol == state.currency ? currency.symbol + amount : null
                  ),
                  gallery: action.payload.gallery[0]
              }
              state.cart.push(cartItem);
          }
      }
      return{
          ...state,
          numberCart:state.numberCart+1
      }

      case "INCREASE": 
        state.numberCart++;
      
        return{...state, cart: state.cart.map(item =>
        item.id === action.payload.id
          ? {...item, quantity: item.quantity + 1}
          : item,
      ),}
      
      case "DECREASE": 
        state.numberCart--;

      if (action.payload.quantity > 1) {
        return {...state, cart: state.cart.map(item =>
          item.id === action.payload.id 
            ? {...item, quantity: item.quantity - 1}
            : item,
        ),}
        } 
      else {
        return {...state, cart: state.cart.filter(item => item !== action.payload)}
        }
        
      default: 
        return {
            currency: state.currency = "$",
            category: state.category = "ALL",
            queryType: state.queryType = GET_All_PRODUCTS,
            cart: state.cart = [],
            };
    }
  }
  
  export const store = createStore(reducer);

  

