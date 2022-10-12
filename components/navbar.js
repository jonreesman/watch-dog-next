import React from 'react'
import { Box, Navbar, Divider, Center, Text, useMantineTheme, Slider, ScrollArea, Button, NativeSelect, Grid } from '@mantine/core';



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
        <NativeSelect
          data={tickers?.map(ticker => {
              const item = {
                value: ticker.Id,
                label: ticker.Name
              }
              return item
          })}
          value={tickerID}
          onChange={(event) => {
            setTicker(event.target.value, )
            console.log(event.target.value)
          }}
          label="Select a stock"
          />

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