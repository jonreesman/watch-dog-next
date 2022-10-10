import React from 'react'
import {Footer, Center, Button, Grid } from '@mantine/core';

const Timeframes = ({setTicker}) => {
  return (
    <Footer height={60} p="md">
              <Center>
              <Grid gutter="md" grow>
                <Grid.Col key="day" span={2}>
                  <Button variant="filled" onClick={() => setTicker(null, "day")}>
                    Day
                  </Button>
                </Grid.Col>
                <Grid.Col key="week" span={2}>
                  <Button variant="filled" onClick={() => setTicker(null,"week")}>
                    Week
                  </Button>
                </Grid.Col>
                <Grid.Col key="month" span={2}>
                  <Button variant="filled" onClick={() => setTicker(null,"month")}>
                    Month
                  </Button>
                </Grid.Col>
                <Grid.Col key="2month" span={2}>
                  <Button variant="filled" onClick={() => setTicker(null,"2month")}>
                    Two Months
                  </Button>
                </Grid.Col>
              </Grid>
              </Center>
    </Footer>
  )
}

export default Timeframes