// mutations are used to create/update/delete data or perform server side-effects
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';
import { BurnData } from '../types/types';

// add a burn - POST request
export const addBurn = async (burn: BurnData): Promise<string> => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (!data.session) {
      throw new Error(error?.message || 'No active Supabase session');
    }

    const res = await fetch('/getBurns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.session.access_token}`,
      },
      body: JSON.stringify(burn),
    });

    if (!res.ok) {
      throw new Error(`Error in addBurn! Status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error in addBurn:', error);
    throw error;
  }
};

export const useAddBurn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addBurn,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['burns'] }); // invalidate cache
    },
  });
};

// update a burn - PATCH request
export const updateBurn = async (burn: Partial<BurnData>) => {
  const { data, error } = await supabase.auth.getSession();

  if (!data.session) {
    throw new Error(error?.message || 'No active Supabase session');
  }

  try {
    const res = await fetch(`getBurns/${burn.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.session.access_token}`,
      },
      body: JSON.stringify(burn),
    });

    if (!res.ok) {
      throw new Error(`Error in updateBurn! Status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error in updateBurn:', error);
    throw error;
  }
};

export const useUpdateBurn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBurn,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['burns'] }); // invalidate cache
    },
  });
};

// delete a burn - DELETE request
export const deleteBurn = async (burn: Partial<BurnData>) => {
  const { data } = await supabase.auth.getSession();

  if (!data.session) return null;

  try {
    const res = await fetch(`getBurns/${burn.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.session.access_token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error in deleteBurn! Status: ${res.status}`);
    }

    return;
  } catch (error) {
    console.error('Error in deleteBurn:', error);
    throw error;
  }
};

export const useDeleteBurn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBurn,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['burns'] });
    },
  });
};
