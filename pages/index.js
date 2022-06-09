import { AppShell, Avatar, Box, Navbar, Header, Aside, Footer, Center, Container, Group, Loader, Text, Burger, MediaQuery, useMantineTheme, ScrollArea, Button, Grid } from '@mantine/core';
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

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar width={{ sm: 200, lg: 300}} p="md" hiddenBreakpoint="sm" hidden={!opened}>
          <Center><Text>Stocks and Cryptos</Text></Center>
          <ScrollArea scrollbarSize={2}>
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
          </ScrollArea>
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
        <Header height={70} p="md" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Group style={{ float: 'left'}}>
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
          </Group>
          <Group style={{ float: 'right' }}>
            <Avatar src="https://avatars.githubusercontent.com/u/8878482?v=4" radius="xl"/>
            <Box sx={{ flex: 1}}>
              <Text size="sm" weight={500}>Jon Reesman</Text>
              <Text color="dimmed" size="xs"><a href="http://jonreesman.dev" style={{ textDecoration: 'none', color: 'black' }}>jonreesman.dev</a></Text>
            </Box>
          </Group>
        </Header>
      }
      footer={
        <Footer height={60} p="md">
          <Center>
          <Grid gutter="md" grow>
            <Grid.Col key="day" span={2}>
              <Button variant="filled" onClick={() => setTimeframe("day")}>
                Day
              </Button>
            </Grid.Col>
            <Grid.Col key="week" span={2}>
              <Button variant="filled" onClick={() => setTimeframe("week")}>
                Week
              </Button>
            </Grid.Col>
            <Grid.Col key="month" span={2}>
              <Button variant="filled" onClick={() => setTimeframe("month")}>
                Month
              </Button>
            </Grid.Col>
            <Grid.Col key="2month" span={2}>
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