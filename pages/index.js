import { AppShell, Avatar, Box, Navbar, Header, Aside, Footer, Center, Container, Group, Loader, Text, Modal, Burger, MediaQuery, useMantineTheme, ScrollArea, Button, Grid } from '@mantine/core';
import MainWindow from './_appshell'
import Chart from '../components/Chart'
import AboutModal from '../components/AboutModal';
import TweetList from '../components/TweetList'
import React, {useState, useEffect} from 'react'
import useTickers from '../hooks/useTickers';
import useTicker from '../hooks/useTicker';

export default function Home() {
  const theme = useMantineTheme();
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