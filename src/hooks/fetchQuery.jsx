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
    staleTime: 5 * 1000, // 5,000 ms - not make the query stale until the data is older than 5 seconds
    //  stale query instruct React Query to update the cache in the background when appropriate
  });
};

// fetch one burn - GET request
export const fetchBurn = async (id) => {
  const response = await fetch(`/getBurns/${id}`);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  return data;
};

export const useFetchBurn = (id) => {
  return useQuery({
    queryKey: ['burn', id],
    queryFn: () => fetchBurn(id),
  });
};
