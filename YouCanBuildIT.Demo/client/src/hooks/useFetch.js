import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);

  const triggerRefreshHandler = () =>{
    setloading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setloading(false);
      });
  }
  
  useEffect(() => {
    triggerRefreshHandler()
  }, [url]);

  return { data, loading, error, triggerRefreshHandler };
}
