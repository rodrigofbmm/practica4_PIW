/* tslint:disable */
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import getApolloClient from '@/libs/client'


export default function App({ Component, pageProps }: AppProps) {
  const client = getApolloClient();
  return (
    // @ts-ignore
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
