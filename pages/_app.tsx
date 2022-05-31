import Layout from '../components/Layout'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
          <h1>Watch-dog</h1>
          <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
