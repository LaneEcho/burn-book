import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '../context/themeContext';
import Container from '../components/container/Container';

// queryClient handles caching, garbage collection, fetching, etc
const queryClient = new QueryClient();

export default function Feed() {
  const [session, setSession] = useState(null); // may want to put this in a context + fix the type for session

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session as any);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session as any);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Container />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
