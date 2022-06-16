import React, { useState, useEffect } from 'react'
import Timeframes from './_footer';
import CustomNavBar from './_navbar';
import { AppShell, Avatar, Box, Header, Group, Text, Modal, Burger, MediaQuery, useMantineTheme } from '@mantine/core';
import Chart from '../components/Chart'
import TweetAside from './_aside';
import AboutModal from '../components/AboutModal';
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
          navbar={<CustomNavBar opened={opened} tickers={tickers} setTicker={setTicker} setModalOpened={setModalOpened} />}
          aside={<TweetAside statement_history={ticker_result.statement_history}/>}
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