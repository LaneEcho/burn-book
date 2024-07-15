// useQuery to make API call and cache response
import { useQuery } from '@tanstack/react-query';

// query is a declarative dependency on an asynchronous source of data that is tied to a unique key

// fetch burns - GET request
export const fetchBurns = async () => {
  const response = await fetch('/getBurns');

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  return data;
};

export const useFetchBurns = () => {
  return useQuery({
    queryKey: ['burns'],
    queryFn: fetchBurns,
    refetchInterval: 1000, // use this to change the interval at which this runs
  });
};
