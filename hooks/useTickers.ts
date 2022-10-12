import { useEffect, useState } from 'react';
import watchdog from '../api/watchdog';



export default (): [any, boolean, boolean] => {
    const [results, setResults] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(true);

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
            console.log(err);
        }
    }
    useEffect(() => {
        getTickersAPI()
      },[])
    return [results, loading, fetched];
};