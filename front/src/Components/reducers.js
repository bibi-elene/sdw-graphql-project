import {legacy_createStore as createStore} from 'redux';
import { GET_All_PRODUCTS } from './Queries';
import { GET_CLOTHES } from './Queries';
import { GET_TECH } from './Queries';


const initialState = {
    currency: "",
    category: "",
    cart: [],
    queryType: GET_All_PRODUCTS,
    numberCart: 0,
    cartItem: {
      id:'',
      quantity: 0,
      name:'',
      brand:'',
      prices: [],
      gallery: '',
      attributes: [],
      selected: ''
    }
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
        state.numberCart++;

        let selectedAttr = action.payload.attributes.map(({items}) => items.filter(({value, id}) => document.getElementById(id).style.backgroundColor == 'rgb(29, 31, 34)' || document.getElementById(id).style.border == '1px solid rgb(94, 206, 123)').map((x) => x));
        let itemPrices = action.payload.prices.map(({amount, currency}) => currency.symbol == state.currency ? currency.symbol + amount : null);
        let itemAttributes = action.payload.attributes.map(({items, id, name}) => items.map(({value, id}) => id));

        if  (state.numberCart == 0) {
           state.cartItem = {
              id:action.payload.id,
              quantity:1,
              name:action.payload.name,
              brand:action.payload.brand,
              prices: itemPrices,
              gallery: action.payload.gallery[0],
              attributes: itemAttributes,
              selected: '',
              selectedSeveral: []
          }
          state.cart.push(state.cartItem); 
        }
        else  {
          let check = false;
          state.cart.map((item,key)=>{
              if(item.id == action.payload.id){
                  state.cart[key].quantity++;
                  check = true;
                }
          });

          if (!check) {
               state.cartItem = {
                  id:action.payload.id,
                  quantity:1,
                  name:action.payload.name,
                  brand:action.payload.brand,
                  prices: itemPrices,
                  gallery: action.payload.gallery[0],
                  attributes: itemAttributes,
                  selected: '',
                  selectedSeveral: []
              }
              state.cart.push(state.cartItem);
          }
 
      }

      for (var i = 0; i < itemAttributes.length; i++) {
        for (var y = 0; y < itemAttributes[i].length; y++) {
          if (document.getElementById(itemAttributes[i][y]).style.backgroundColor == "black") {
            state.cartItem.selected = document.getElementById(itemAttributes[i][y]).id
            state.cartItem.selectedSeveral.push(state.cartItem.selected);
          }
      }
    }

              console.log(state.cartItem)


      return{
          ...state,
          numberCart: state.numberCart++
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
            numberCart: 0,
            cartItem: {
              id:'',
              quantity: 0,
              name:'',
              brand:'',
              prices: [],
              gallery: '',
              attributes: [],
              selected: ''
            }
            };
    }
  }
  
  export const store = createStore(reducer);

  

