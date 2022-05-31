import { useEffect, useState } from 'react';
import watchdog from '../pages/api/watchdog';

export default () => {
    const [results, setResults] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")

    const getTickersAPI = async () => {
        setLoading(true)
        try {
            const response = await watchdog.get('/tickers', {});
            console.log(response.data)
            setResults(response.data)
            setFetched(true)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setError(err)
            console.log(err);
        }
    }
    useEffect(() => {
        getTickersAPI()
      },[])
    return [results, loading, fetched, error];
};