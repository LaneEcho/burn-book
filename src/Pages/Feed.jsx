import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Container from '../components/container/container.jsx';

// queryClient handles caching, garbage collection, fetching, etc
const queryClient = new QueryClient();

export default function Feed() {
  const [session, setSession] = useState(null); // may want to put this in a context

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Container />
    </QueryClientProvider>
  );
}
