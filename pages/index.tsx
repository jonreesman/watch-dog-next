import { Center, Container, Loader, Text } from '@mantine/core';
import MainWindow from './_appshell'
import React from 'react'
import useTickers from '../hooks/useTickers';

export default function Home() {
  const [tickers_results, tickers_loading, tickers_fetched] = useTickers();

  if (tickers_loading)  {
    return (
      <Container style={{ position: 'fixed', top: '50%', left: '50%' }}>
        <Center style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Loader size="lg"/>
          <Text size="md">Loading Watch-dog</Text>
        </Center>
      </Container>
    )  
  }
  if (!tickers_fetched && !tickers_loading) return <div>Unable to communicate with server.</div>;

  return(
    <MainWindow tickers={tickers_results} />
  )

}