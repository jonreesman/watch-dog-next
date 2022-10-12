import React, { useState, useEffect } from 'react'
import CustomNavBar from '../components/navbar';
import { AppShell, Avatar, Box, Container, Header, Group, Text, Modal, Burger, MediaQuery, useMantineTheme, Loader, Center, Tabs } from '@mantine/core';
import Chart from '../components/Chart'
import AboutModal from '../components/AboutModal';
import useTicker from '../hooks/useTicker';
import TweetList from '../components/TweetList';

type Props = {
  tickers: any
}

const MainWindow: React.FC<Props> = ({tickers}) => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [activeTab, setActiveTab] = useState<string | null>("chart")
    const [modalOpened, setModalOpened] = useState(false);
    const [ticker_result, ticker_loading, ticker_fetched, getTickerAPI] = useTicker();
    const [timeframe, setTimeframe] = useState("day")
    const [tickerID, setTickerID] = useState(1)


    const setTicker = (newId: number, time: string) => {
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
          navbar={<CustomNavBar opened={opened} tickers={tickers} setTicker={setTicker} setModalOpened={setModalOpened} tickerID={tickerID} />}
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
        >
          <Modal opened={modalOpened}
                 onClose={()=>setModalOpened(false)}
                 title="About"
          >
            <AboutModal />
          </Modal>
          <Tabs value={activeTab} onTabChange={setActiveTab}>
            <Tabs.List>
              <Tabs.Tab value="chart">Chart</Tabs.Tab>
              <Tabs.Tab value="tweets">Tweets</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="chart">
              {ticker_result && ticker_fetched
              ? <Chart tickerResult={ticker_result} fetched={ticker_fetched} timeframe={timeframe} navbarOpened={opened} />
              : <Container style={{ position: 'fixed', top: '50%', left: '50%' }}>
                    <Center style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Text size="md">Loading ticker...</Text>
                    </Center>
                  </Container>
              }
            </Tabs.Panel>
            <Tabs.Panel value="tweets">
              {ticker_result.statement_history ? <TweetList tweets={ticker_result.statement_history} />
              : <Loader size="lg"/>}
            </Tabs.Panel>
          </Tabs>
        </AppShell>
      )
}

export default MainWindow