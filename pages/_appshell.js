import React, { useState, useEffect } from 'react'
import Timeframes from './_footer';
import { AppShell, Avatar, Box, Navbar, Header, Aside, Footer, Center, Container, Group, Loader, Text, Modal, Burger, MediaQuery, useMantineTheme, ScrollArea, Button, Grid } from '@mantine/core';
import Chart from '../components/Chart'
import TweetAside from './_aside';
import AboutModal from '../components/AboutModal';
import TweetList from '../components/TweetList'
import useTicker from '../hooks/useTicker';

const MainWindow = ({tickers}) => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [modalOpened, setModalOpened] = useState(false);
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

    return (
        <AppShell
          padding="md"
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          navbar={
            <Navbar width={{ sm: 200, lg: 300}} p="md" hiddenBreakpoint="sm" hidden={!opened}>
              <Navbar.Section>
              <Center><Text>Stocks and Cryptos</Text></Center>
              </Navbar.Section>
              <Navbar.Section grow component={ScrollArea} width={{ sm: 200, lg: 300 }}>
                <Grid gutter="md" grow>
                  {tickers.map(ticker => {
                    return (
                      <Grid.Col span={4} key={ticker.ID}>
                        <Button variant="filled" onClick={() => setTicker(ticker.Id, )}>
                          {ticker.Name}
                        </Button>
                      </Grid.Col>
                    )
                  })}
                </Grid>
              </Navbar.Section>
              <Navbar.Section>
                <Box sx={{ paddingTop: theme.spacing.sm,
                            borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                            }`,
                }}>
                  <Center>
                    <Button onClick={() => setModalOpened(true)}>About</Button>
                  </Center>
                </Box>
              </Navbar.Section>
            </Navbar>
          }
          aside={
            <TweetAside statement_history={ticker_result.statement_history}/>
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
            <Timeframes setTicker={setTicker} />
          }
        >
          <Modal opened={modalOpened}
                 onClose={()=>setModalOpened(false)}
                 title="About"
          >
            <AboutModal />
          </Modal>
          <MediaQuery largerThan="md" smallerThan="lg" styles={{display: 'none'}}>
            <Chart tickerResult={ticker_result} fetched={ticker_fetched} timeframe={timeframe} />
          </MediaQuery>
        </AppShell>
      )
}

export default MainWindow