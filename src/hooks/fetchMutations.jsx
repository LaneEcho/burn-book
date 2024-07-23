// mutations are used to create/update/delete data or perform server side-effects
import { useMutation, useQueryClient } from '@tanstack/react-query';

// add a burn
export const addBurn = async () => {
  const res = await fetch('/getBurns', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: comment,
    }),
  });
  return res.json();
};

export const useAddBurn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addBurn,

    // callback to invalidate burns in cache
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['burns'] });
      console.log('Girl on girl crime commmitted');
    },
  });
};
