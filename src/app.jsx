import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Container from './components/container/container.jsx';

// queryClient handles caching, garbage collection, fetching, etc
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Container />
    </QueryClientProvider>
  );
}

export default App;
