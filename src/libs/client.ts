import { NormalizedCacheObject } from "@apollo/client/cache";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const CSRclient = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache(),
})

export const getClient =() =>{
    if(typeof window === 'undefined'){
        return new ApolloClient({
            uri: "https://rickandmortyapi.com/graphql",
            cache: new InMemoryCache(),
        })
    }else return CSRclient;
        
}

export default getClient;

