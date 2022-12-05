import {legacy_createStore as createStore} from 'redux';
import { GET_All_PRODUCTS } from './Queries';
import { GET_CLOTHES } from './Queries';
import { GET_TECH } from './Queries';

const initialState = {
    currency: "$",
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
      selected: [],
      selectedSeveral: []
    },
  }
  
  const reducer = (state = initialState, action) => {
    switch(action.type) {
      case "$":
        localStorage.setItem('Currency', "$")
        return {...state, currency: state.currency = "$"};
  
      case "£":
        localStorage.setItem('Currency', "£")
        return {...state, currency: state.currency = "£"};
  
      case "A$":
        localStorage.setItem('Currency', "A$")
        return {...state, currency: state.currency = "A$"};
  
      case "¥":
        localStorage.setItem('Currency', "¥")
        return {...state, currency: state.currency = "¥"};
  
      case "₽":
        localStorage.setItem('Currency', "₽")
        return {...state, currency: state.currency = "₽"};

      case "ALL":
        return {...state, category: state.category = "ALL", queryType: state.queryType = GET_All_PRODUCTS};
      
      case "CLOTHES":
        return {...state, category: state.category = "CLOTHES", queryType: state.queryType = GET_CLOTHES};
      
      case "TECH":
        return {...state, category: state.category = "TECH", queryType: state.queryType = GET_TECH};
      
      case "ADD_CART":
        let itemPrices = action.payload.prices.map(({amount, currency}) => currency.symbol + amount);
        let itemAttributes = action.payload.attributes.map(({items, id, name, type}) => items.map(({value, id}) => id));
        let defaultValues = itemAttributes.map(x => x[0]);
        let chosen = [];

        if (action.plp == false) {
          const chosenAttr = itemAttributes.map(x => x.filter(y =>  
          document.getElementById(y).style.backgroundColor == "black" 
          || 
          document.getElementById(y).style.border == "2px solid green"
          ? 
          chosen.push(y) : null));
          }

        if (action.plp == true) {
          state.numberCart++;
          localStorage.setItem('NumberCart', JSON.stringify(state.numberCart));
          localStorage.setItem('Cart', JSON.stringify(state.cart));

          if  (state.numberCart == 0) {
            state.cartItem = {
                id:action.payload.id,
                quantity:1,
                name:action.payload.name,
                brand:action.payload.brand,
                prices: itemPrices,
                gallery: action.payload.gallery[0],
                attributes: action.payload.attributes,
                selected: defaultValues,
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
                    attributes: action.payload.attributes,
                    selected: defaultValues,
                }
                state.cart.push(state.cartItem);
            }
        }


          return{
              ...state,
              numberCart: state.numberCart++
          }
          }
          
          if (itemAttributes.length === chosen.length && action.payload.attributes.length > 0) {

            state.numberCart++;
            localStorage.setItem('NumberCart', JSON.stringify(state.numberCart));
            localStorage.setItem('Cart', JSON.stringify(state.cart));

            if  (state.numberCart == 0) {
              state.cartItem = {
                  id:action.payload.id,
                  quantity:1,
                  name:action.payload.name,
                  brand:action.payload.brand,
                  prices: itemPrices,
                  gallery: action.payload.gallery[0],
                  attributes: action.payload.attributes,
                  selected: chosen,
              }
              state.cart.push(state.cartItem); 
            }
            else  {
              let check = false;
              state.cart.map((item,key)=>{
                  if(item.id == action.payload.id && JSON.stringify(item.selected) == JSON.stringify(chosen)){
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
                      attributes: action.payload.attributes,
                      selected: chosen,
                  }
                  state.cart.push(state.cartItem);
              }
          }


          return{
              ...state,
              numberCart: state.numberCart++
          }
        } 
        if (action.payload.attributes.length == 0) {
          state.numberCart++;
          localStorage.setItem('NumberCart', JSON.stringify(state.numberCart));
          localStorage.setItem('Cart', JSON.stringify(state.cart));


            if  (state.numberCart == 0) { 
            state.cartItem = {
              id:action.payload.id,
              quantity:1,
              name:action.payload.name,
              brand:action.payload.brand,
              prices: itemPrices,
              gallery: action.payload.gallery[0],
            }
            state.cart.push(state.cartItem); 
            } else  {
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
                    }
                    state.cart.push(state.cartItem);
                }
        }
            return{
                ...state,
                numberCart: state.numberCart++
            }
      }
        
          else {
            return {...state, numberCart: state.numberCart}
          }

      case "INCREASE": 
        state.numberCart++;
        localStorage.setItem('NumberCart', JSON.stringify(state.numberCart));
        localStorage.setItem('Cart', JSON.stringify(state.cart));

      
        return{...state, cart: state.cart.map((item, key) =>
        item.id === action.payload.id && JSON.stringify(action.payload.selected) == JSON.stringify(state.cart[key].selected)
          ? {...item, quantity: item.quantity + 1}
          : item,
      ),}
      
      case "DECREASE": 
        state.numberCart--;
        localStorage.setItem('NumberCart', JSON.stringify(state.numberCart));
        localStorage.setItem('Cart', JSON.stringify(state.cart));

      if (action.payload.quantity > 1) {
        state.cart.map((item,key)=>{
          if(item.id == action.payload.id && JSON.stringify(action.payload.selected) == JSON.stringify(state.cart[key].selected)){
              state.cart[key].quantity--;
            }
      })
      return {...state}
    }
      else {
        return {...state, cart: state.cart.filter(item => item !== action.payload)}
        }

        
      default: 
        return {
            currency: "$",
            category:  "ALL",
            queryType: GET_All_PRODUCTS,
            cart: state.cart,
            numberCart: 0,
            cartItem: {
              id:'',
              quantity: 0,
              name:'',
              brand:'',
              prices: [],
              gallery: '',
              attributes: [],
              selected: [],
            }
            };
    }
  }
  
  export const store = createStore(reducer);

  

