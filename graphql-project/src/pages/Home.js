import { useQuery, gql } from '@apollo/client';

    const GET_LOCATIONS = gql`
        query GetLocations {
            category {
            name
            products {
              id
              name
              brand
            }
          }
      }
    `;

    function DisplayLocations() {
        const { loading, error, data } = useQuery(GET_LOCATIONS);
      
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        console.log(data.category.products)
      
        return data.category.products.map(({ name, brand, id}) => (
          <div key={id}>
            <h3>{id}</h3>
            <p>{name} + {brand}</p>
            <br />
          </div>
        ));
      }


    const Home = () => {
        return (
            <div>
                <h2>My first Apollo app</h2>
                <br/>
                <DisplayLocations />
            </div>
        )
}

export default Home;