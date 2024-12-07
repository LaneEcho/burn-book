// mutations are used to create/update/delete data or perform server side-effects
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient.js';

// add a burn - POST request
export const addBurn = async (burn) => {
  const { data } = await supabase.auth.getSession();

  const res = await fetch('/getBurns', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.session.access_token}`,
    },
    body: JSON.stringify(burn),
  });
  return res.json();
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
export const updateBurn = async (burn) => {
  const { data } = await supabase.auth.getSession();

  const res = await fetch(`getBurns/${burn.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.session.access_token}`,
    },
    body: JSON.stringify(burn),
  });
  return res.json();
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
export const deleteBurn = async (burn) => {
  const { data } = await supabase.auth.getSession();

  const res = await fetch(`getBurns/${burn.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.session.access_token}`,
    },
  });

  return;
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
