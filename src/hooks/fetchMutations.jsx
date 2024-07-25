// mutations are used to create/update/delete data or perform server side-effects
import { useMutation, useQueryClient } from '@tanstack/react-query';

// add a burn
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
