import { Container, Center, Loader, Text } from '@mantine/core';
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
  console.log(dataSet)
  return dataSet
}

const setTimeLabel = (time, interval) => {
  var intervalOptions
  switch (interval) {
    case "day":
      intervalOptions = new Intl.DateTimeFormat('en-US', {hour: 'numeric'})
      break
    case "week":
      intervalOptions = new Intl.DateTimeFormat('en-US', {day: "numeric", hour: 'numeric'})
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

const Chart = ({tickerResult, fetched, timeframe}) => {
  if (!fetched || tickerResult === undefined) {
    return (
    <Container style={{ position: 'fixed', top: '50%', left: '50%' }}>
        <Center style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Loader size="lg"/>
          <Text size="md">Loading ticker...</Text>
        </Center>
      </Container>
    )  
  }

  if (tickerResult.quote_history === undefined || tickerResult.quote_history === null) {
    return (
      <Container style={{ position: 'fixed', top: '50%', left: '50%' }}>
        <Center style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Text size="md">Unable to load ticker quote data.</Text>
        </Center>
      </Container>
    )
  }
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

  return (
    <div className={styles.container}>
    <p className={styles.title}>{ticker.Name}</p>
    <p className={styles.subtitle}>{setTimeLabel(minTime,"full")}-{setTimeLabel(maxTime,"full")}</p>
    <ResponsiveContainer width="99%" height={300}>
        <LineChart
          width={900}
          height={300}
          data={d}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="TimeStamp" type="number" domain={['dataMin', 'dataMax']} tickFormatter={(TimeStamp)=>{
              return setTimeLabel(TimeStamp, timeframe)
          }}/>
          <YAxis yAxisId="left" scale="log" domain={['auto','auto']} name="$" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip labelFormatter={(value)=>{
              return setTimeLabel(value, "full")
          }}
          formatter={(value)=>value.toFixed(3)} />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="CurrentPrice" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line yAxisId="right" type="monotone" dataKey="Sentiment" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
      </div>
  )
}

export default Chart