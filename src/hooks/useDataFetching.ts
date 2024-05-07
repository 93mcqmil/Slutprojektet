import axios from "axios";
import { useEffect, useState } from "react"

//exporting custom hook
export const useDataFetching = (API: string) => {
    const [data, setData] = useState();

    useEffect(() => {
        let ignore = false;

        const fetchData = async () => {
            try {
                const response = await axios.get(API);
                const data = (response.data)
                setData(data)
            } catch (error) {
                console.error('Error Error Error data:', error)
            }
        }
        fetchData();
    }, [])
    return data;
}