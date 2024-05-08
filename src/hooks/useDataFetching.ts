import axios from "axios";
import { useEffect, useState } from "react"

//exporting custom hook
export const useDataFetching = <T>(API: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let ignore = false;

        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await axios.get(API);
                const responseData = response.data as T

                if (!ignore) {
                    setData(responseData)

                }
            } catch (error) {
                console.error('Error Error Error data:', error)
                setError("error fetching data. try again")
            } finally {
                setLoading(false)
            }
        };
        fetchData();
        return () => { ignore = true } // cleanup function
    }, [API]) // add api do dependecy array
    return { data, loading, error }; // in my searchfield component i have access to these above
}