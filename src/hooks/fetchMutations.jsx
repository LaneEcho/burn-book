// mutations are used to create/update/delete data or perform server side-effects
import { useMutation, useQueryClient } from '@tanstack/react-query';

// add a burn - POST request
export const addBurn = async (comment) => {
  const res = await fetch('/getBurns', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
  return res.json();
};

export const useAddBurn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addBurn,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['burns'] }); // invalidate cache
      console.log('Girl on girl crime commmitted');
    },
  });
};

// delete a burn - DELETE request
export const deleteBurn = async (id) => {
  console.log('ID', id);
  const res = await fetch('/getBurns', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id),
  });
  return res.json();
};

export const useDeleteBurn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBurn,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['burns'] });
      console.log('Girl on girl crime deleted');
    },
  });
};
