import React from 'react'
import { Box, Navbar, Divider, Center, Text, useMantineTheme, Slider, ScrollArea, Button, MultiSelect, Grid } from '@mantine/core';



const CustomNavBar = ({opened, tickers, setTicker, setModalOpened, tickerID}) => {
  const theme = useMantineTheme();
  const MARKS = [
    { value: 0, label: 'day', data: 'day' },
    { value: 25, label: 'week', data: 'week' },
    { value: 50, label: 'month', data: 'month' },
    { value: 75, label: 'two months', data: '2month' },
  ];
  return (
    <Navbar width={{ sm: 200, lg: 300}} p="md" hiddenBreakpoint="sm" hidden={!opened}>
      <Navbar.Section>
        <Center><Text>Stocks and Cryptos</Text></Center>
      </Navbar.Section>
      <Navbar.Section 
        grow component={ScrollArea} width={{ sm: 200, lg: 300 }}>
        <Grid gutter="md" justify="space-between" grow>
                  {tickers?.map(ticker => {
                    return (
                      <Grid.Col span={4} lg={4} md={2} key={ticker.ID}>
                        <Button variant="light" onClick={() => setTicker(ticker.Id, )}>
                          {ticker.Name}
                        </Button>
                      </Grid.Col>
                    )
                  })}
                </Grid>
        {/*<MultiSelect
        data={tickers.map((ticker)=> {
          const tick = {
            value: ticker.Name,
            label: ticker.Name,
            id: ticker.Id
          }
          return tick
        })}
        onChange={(ticker) => {
          console.log(ticker)
          setTicker(ticker.id)
        }}
        maxSelectedValues={1}
        placeholder="Pick one"
        searchable
        nothingFound="Nothing found"
      />*/}

        </Navbar.Section>
        <Navbar.Section>
          <Divider my="sm" />
          <Text align="center" style={{marginBottom: "5px"}}>
            Set Date Range:
          </Text>
          <Slider
            label={(val) => MARKS.find((mark) => mark.value === val).label}
            defaultValue={0}
            step={25}
            max={75}
            marks={MARKS}
            styles={{ markLabel: { display: 'none' } }}
            onChangeEnd={(val) => {
              setTicker(null, MARKS.find((mark) => mark.value===val).data)
            }}
          />
        </Navbar.Section>
        <Navbar.Section>
          <Divider my="sm" />
          <Center>
            <Button onClick={() => setModalOpened(true)}>About</Button>
          </Center>
        </Navbar.Section>
      </Navbar>
  )
}

export default CustomNavBar