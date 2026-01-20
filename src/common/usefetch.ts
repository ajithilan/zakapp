import axios from "axios"
import { useEffect, useState } from "react";

export const useFetch = () => {
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://my-json-server-zakapp.onrender.com/products')
        .then(res => setApiData(res.data))
        .catch(err => {
            console.log(err.message);
            alert('Error fetching products. See console for more details')
        })
        .finally(() => setLoading(false));
    }, [])

    return { apiData, loading };
}