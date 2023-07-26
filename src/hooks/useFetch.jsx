import { useState, useEffect } from 'react';

function useFetch(url) {
  // state for fetching data
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // load inital burns upon page load
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((usefulData) => {
        console.log(usefulData);
        setLoading(false);
        setData(usefulData);
      })
      .catch((err) => {
        console.log('Error in getBurns: ', err);
      });
  }, []);

  return { data, loading, error };
}

export default useFetch;
