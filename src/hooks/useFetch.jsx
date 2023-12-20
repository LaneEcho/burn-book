import { useState, useEffect } from 'react';

// custom hook to fetch data once on page load via useEffect hook

function useFetch(url) {
  // state for fetching data
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // load inital burns upon page load
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((usefulData) => {
        // console.log(usefulData);
        setLoading(false);
        setData(usefulData);
      })
      .catch((err) => {
        setError(true);
        console.log('Error in getBurns: ', err);
      });
  }, []);

  return { data, loading, error };
}

export default useFetch;
