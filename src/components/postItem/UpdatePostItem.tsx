import React, {
  useState,
  useEffect,
  JSX,
  SetStateAction,
  Dispatch,
} from 'react';
import { useFetchBurn } from '../../hooks/fetchQuery';
import { useUpdateBurn } from '../../hooks/fetchMutations';
import './postItem.scss';

// TODO: probably want to debounce this input change
// TODO: Handle error state

interface UpdatePostItemType {
  id: string;
  open: Dispatch<SetStateAction<boolean>>;
}

function UpdatePostItem({ id, open }: UpdatePostItemType): JSX.Element {
  const [comment, setComment] = useState('');

  const { isLoading, error, data } = useFetchBurn(id);

  const { mutate } = useUpdateBurn();

  // useEffect to handle data changes
  useEffect(() => {
    if (!isLoading && !error && data) {
      setComment(data.message);
    }
  }, [data, isLoading, error]);

  // update function
  // id needs to be id of burn entry
  const handleUpdate = async (event) => {
    event.preventDefault();

    mutate({ message: comment, id: data?.id });

    // we have got to refactor this so we can close the modal
    open(false);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Optionally, show a loading indicator
  }

  if (error) {
    return <div>Error fetching data {error as any}</div>;
  }

  return (
    <div className="update-post">
      <form onSubmit={handleUpdate}>
        <label htmlFor="text">Update</label>
        <input
          type="text"
          id="text"
          value={comment} // Bind input value to fetched comment
          onChange={(e) => setComment(e.target.value)} // Handle input change
          placeholder="Enter your update"
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
        <button
          type="button"
          className="secondary-button"
          onClick={() => open(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdatePostItem;
