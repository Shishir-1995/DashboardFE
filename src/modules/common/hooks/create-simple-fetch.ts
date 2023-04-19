import { useCallback, useEffect, useState } from 'react';

interface Props<T, X> {
  get: (...v: X[]) => Promise<T>;
}

function createSimpleFetch<T = object, X = unknown[]>(props: Props<T, X>) {
  return function () {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async function (...args: X[]) {
      try {
        setLoading(true);
        const data = await props.get(...args);
        setData(data);
        setLoading(false);
      } catch (error) {
        console.debug(error);
      }
    }, []);

    useEffect(() => {
      fetchData();
    }, [fetchData]);

    return { loading, data, refetch: fetchData };
  };
}

export { createSimpleFetch };
