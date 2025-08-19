// mutations are used to create/update/delete data or perform server side-effects
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';

// add a burn - POST request
export const addBurn = async (burn: any) => {
  const { data } = await supabase.auth.getSession();

  if (!data.session) return null;

  try {
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

    return res.json;
  } catch (error) {
    console.error('Error in addBurn:', error);
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
export const updateBurn = async (burn: any) => {
  const { data } = await supabase.auth.getSession();

  if (!data.session) return null;

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

    return res.json;
  } catch (error) {
    console.error('Error in updateBurn:', error);
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
export const deleteBurn = async (burn: any) => {
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
