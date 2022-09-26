import { useQuery, gql } from '@apollo/client';
import { ApolloClient } from '@apollo/client/core';

const categoryName = "all";

export const GET_All_PRODUCTS = gql`
        query GetProducts {
          category(input: { title: "all" }){
            name
            products{
              id
              name
              inStock
              gallery
              description
              category
              brand
              attributes {
                name
                id
                items{
                  displayValue
                  value
                  id
                }
              }
              prices{
                currency {
                  label
                  symbol
                }
                amount
              }
              brand
              
              }
            }
      }
    `;

    export const GET_CLOTHES = gql`
        query GetProducts {
          category(input: { title: "clothes" }){
            name
            products{
              id
              name
              inStock
              gallery
              description
              category
              brand
              attributes {
                name
                id
                items{
                  displayValue
                  value
                  id
                }
              }
              prices{
                amount
              }
              brand
              
              }
            }
      }
    `;

    export const GET_TECH = gql`
        query GetProducts {
          category(input: { title: "tech" }){
            name
            products{
              id
              name
              inStock
              gallery
              description
              category
              brand
              attributes {
                name
                id
                items{
                  displayValue
                  value
                  id
                }
              }
              prices{
                amount
              }
              brand
              
              }
            }
      }
    `;

    export const GET_CATEGORY = gql `
      query getCategory {
        categories {
          name
        }
      }
    `;