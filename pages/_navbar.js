import React from 'react'
import { AppShell, Avatar, Box, Navbar, Header, Aside, Footer, Center, Container, Group, Loader, Text, Modal, Burger, MediaQuery, useMantineTheme, ScrollArea, Button, Grid } from '@mantine/core';


const CustomNavBar = () => {
  return (
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
  )
}

export default CustomNavBar