import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";

interface UseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: any;
  triggerRefreshHandler: () => void;
}

const useFetch = <T = any>(url: string): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, triggerRefreshHandler: fetchData };
};

export default useFetch;
