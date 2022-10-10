import React, { useState, useEffect } from 'react';
import { Container, Center, Loader, Text, useMantineTheme, MediaQuery, Paper } from '@mantine/core';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import styles from '../styles/Chart.module.css'

const merge = (sentimentHistory, quoteHistory) => {
  let result = [];
  if (quoteHistory.length === 0 || quoteHistory === undefined) {
    return sentimentHistory;
  }
  if (sentimentHistory.length === 0 || sentimentHistory === undefined) {
    return quoteHistory
  }

  while(sentimentHistory.length && quoteHistory.length) {
    if (sentimentHistory[0].TimeStamp < quoteHistory[0].TimeStamp) {
      result.push({TimeStamp:sentimentHistory[0].TimeStamp, Sentiment:sentimentHistory[0].CurrentPrice})
      sentimentHistory.shift()
    } else {
      result.push({TimeStamp:quoteHistory[0].TimeStamp, CurrentPrice:quoteHistory[0].CurrentPrice})
      quoteHistory.shift()
    }
  }
  while (sentimentHistory.length) {
    result.push({TimeStamp:sentimentHistory[0].TimeStamp, Sentiment:sentimentHistory[0].CurrentPrice})
    sentimentHistory.shift()
  }
  while (quoteHistory.length) {
    result.push({TimeStamp:quoteHistory[0].TimeStamp, CurrentPrice:quoteHistory[0].CurrentPrice})
    quoteHistory.shift()
  }
  return result
}

const normalizeXAxis = (dataSet) => {
  if (dataSet[0] === undefined) {
    console.log("UNDEFINED FREAK OUT")
    return
  }
  if (dataSet.length === 1) {
    return dataSet
  }
  let min = dataSet[0].TimeStamp
  let max = dataSet[dataSet.length - 1].TimeStamp
  dataSet.map(item => {
    item.x = (item.TimeStamp - min) / (max-min) * 100
  })
  return dataSet
}

const setTimeLabel = (time, interval) => {
  var intervalOptions
  switch (interval) {
    case "day":
      intervalOptions = new Intl.DateTimeFormat('en-US', {hour: 'numeric'})
      break
    case "week":
      intervalOptions = new Intl.DateTimeFormat('en-US', {day: 'numeric'})
      break
    case "month":
      intervalOptions = new Intl.DateTimeFormat('en-US', {day: "numeric", month:"short"})
      break
    case "2month":
      intervalOptions = new Intl.DateTimeFormat('en-US', {day: "numeric", month: "short"})
      break
    case "full":
      intervalOptions = new Intl.DateTimeFormat('en-US', {day: "numeric", month: "long", hour: "numeric"})
      break
    default:
      intervalOptions = new Intl.DateTimeFormat('en-US', {hour: 'numeric'})

  }
  return intervalOptions.format(new Date(time * 1000))
}

const getXTickCount = () => {
  const { innerWidth: width } = window
  if (width > 1200) {
    return 12
  }
  if (width > 800 && width < 1200) {
    return 8
  }
  return 5
}

const getYTickCount = () => {
  const { innerHeight: height } = window
  if (height > 1200) {
    return 12
  }
  if (height > 800 && height < 1200) {
    return 8
  }
  return 5
}

const Chart = ({tickerResult, fetched, timeframe, navbarOpened}) => {
  const theme = useMantineTheme();
  const [yTickCount, setYTickCount] = useState(getYTickCount());
  const [xTickCount, setXTickCount] = useState(getXTickCount());
  const [sentimentGraphScale, setSentimentGraphScale] = useState("auto");
  const [priceGraphScale, setPriceGraphScale] = useState("log");

  const [sentimentOpacity, setSentimentOpacity] = useState(1);
  const [priceOpacity, setPriceOpacity] = useState(1);

  useEffect(() => {
    setYTickCount(getYTickCount())
  },[window.innerHeight])
  useEffect(() => {
    setXTickCount(getXTickCount())
  },[window.innerWidth])

  if (tickerResult.sentiment_history === undefined || tickerResult.sentiment_history === null) {
    return (
    <Container style={{ position: 'fixed', top: '50%', left: '50%' }}>
      <Center style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Text size="md">Unable to load ticker sentiment data.</Text>
      </Center>
    </Container>
    )
  }

  var ticker = tickerResult.ticker
  var quoteHistory = [...tickerResult.quote_history]
  var sentimentHistory = [...tickerResult.sentiment_history]

  var d = normalizeXAxis(merge(sentimentHistory, quoteHistory));
  var minTime = d[0].TimeStamp
  var maxTime = d[d.length - 1].TimeStamp

  const handleMouseEnter = (o) => {
    const { dataKey } = o
    if (dataKey === 'CurrentPrice') {
      setPriceOpacity(0.5)
    }
    if (dataKey === 'Sentiment') {
      setSentimentOpacity(0.5)
    }
  }

  const handleMouseLeave = (o) => {
    const { dataKey } = o
    if (dataKey === 'CurrentPrice') {
      setPriceOpacity(1)
    }
    if (dataKey === 'Sentiment') {
      setSentimentOpacity(1)
    }
  }

  return (
    <div style={{position: "relative"}}>
      <ResponsiveContainer width={"99%"} aspect={1.8} style={{position: "absolute"}} >
          <LineChart
            id="chart"
            width={'100%'}
            aspect={0.9}
            debounce={1}
            data={d}
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="TimeStamp" type="number" domain={['dataMin', 'dataMax']} tickCount={xTickCount} tickFormatter={(TimeStamp)=>{
              return setTimeLabel(TimeStamp, timeframe)
            }}/>
            <YAxis yAxisId="left" scale="log" tickCount={yTickCount} domain={['auto','auto']} mirror name="$" />
            <YAxis yAxisId="right" scale="auto" tickCount={yTickCount} mirror orientation="right" />
            <Tooltip labelFormatter={(value)=>{
              return setTimeLabel(value, "full")
            }}
            formatter={(value)=>value.toFixed(3)} />
            <Line yAxisId="left" type="monotone" dataKey="CurrentPrice" strokeOpacity={priceOpacity} stroke="#8884d8" activeDot={{ r: 8 }} tickCount={yTickCount} connectNulls />
            <Line yAxisId="right" type="basis" dataKey="Sentiment" strokeOpacity={sentimentOpacity} stroke="#82ca9d" tickCount={yTickCount} connectNulls  />
          </LineChart>
        </ResponsiveContainer>
      </div>
  )
}

export default Chart