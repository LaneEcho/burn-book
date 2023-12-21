import { useState, useEffect } from 'react';

// custom hook to fetch data once on page load

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(url)
      .then((response) => response.json())
      .then((usefulData) => {
        // console.log(usefulData);
        setData(usefulData);
      })
      .catch((err) => {
        setError(true);
        console.log('Error in getBurns: ', err);
      });
    setLoading(false);
  }, []);

  return { data, loading, error };
}

export default useFetch;
