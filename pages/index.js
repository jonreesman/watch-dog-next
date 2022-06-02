import { AppShell, Navbar, Header, Aside, Footer, Center, Container, Text, Burger, MediaQuery, useMantineTheme, ScrollArea, Button, Grid } from '@mantine/core';
import Chart from '../components/Chart'
import TweetList from '../components/TweetList'
import React, {useState, useEffect} from 'react'
import useTickers from '../hooks/useTickers';
import useTicker from '../hooks/useTicker';

export default function Home() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [tickers_results, tickers_loading, tickers_fetched] = useTickers();
  const [ticker_result, ticker_loading, ticker_fetched, getTickerAPI] = useTicker();
  const [timeframe, setTimeframe] = useState("day")
  const [tickerID, setTickerID] = useState(1)
  const setTicker = (newId, time) => {
    if (newId != undefined) {
      setTickerID(newId)
    }
    if (time != undefined) {
      setTimeframe(time)
    }
  }

  useEffect(() => {
    getTickerAPI(tickerID, timeframe)
  },[timeframe, tickerID])

  if (tickers_loading) return <div>Loading...</div>;
  if (ticker_loading) return <div>Loading...</div>;
  if (!tickers_fetched && !tickers_loading) return <div>Unable to communicate with server.</div>;

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar width={{ base: 300}} height={500} p="md" hidden={!opened}>
          <Center><Text>Stocks and Cryptos</Text></Center>
          <Grid gutter="md" grow>
            {tickers_results.map(ticker => {
              return (
                <Grid.Col span={4} key={ticker.ID}>
                  <Button variant="filled" onClick={() => setTicker(ticker.Id, )}>
                    {ticker.Name}
                  </Button>
                </Grid.Col>
              )
            })}
          </Grid>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: 'none'}}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300}}>
            <Center><Text>Tweets</Text></Center>
              <ScrollArea scrollbarSize={2}>
                <TweetList tweets={ticker_result.statement_history}/>
              </ScrollArea>
          </Aside>
        </MediaQuery>
      }
      header={
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{display: 'none'}}>
              <Burger 
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Text>Watch-Dog</Text>
          </div>
        </Header>
      }
      footer={
        <Footer height={60} p="md">
          <Center>
          <Grid gutter="md" grow>
            <Grid.Col span={2}>
              <Button variant="filled" onClick={() => setTimeframe("day")}>
                Day
              </Button>
            </Grid.Col>
            <Grid.Col span={2}>
              <Button variant="filled" onClick={() => setTimeframe("week")}>
                Week
              </Button>
            </Grid.Col>
            <Grid.Col span={2}>
              <Button variant="filled" onClick={() => setTimeframe("month")}>
                Month
              </Button>
            </Grid.Col>
            <Grid.Col span={2}>
              <Button variant="filled" onClick={() => setTimeframe("2month")}>
                Two Months
              </Button>
            </Grid.Col>
          </Grid>
          </Center>
        </Footer>
      }
    >
      <MediaQuery largerThan="md" smallerThan="lg" styles={{display: 'none'}}>
        <Chart tickerResult={ticker_result} fetched={ticker_fetched} timeframe={timeframe} />
      </MediaQuery>
    </AppShell>
  )
}