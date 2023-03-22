import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { IsoOutlined } from '@mui/icons-material';

const ENDPOINT =
  'https://api-eu-west-2.hygraph.com/v2/clfi06ktk0hok01ugg95actwd/master';

const showsAnonQuery = `{
  shows{
    id
    title
    info
    photoUrl
  }
}
`;

function App() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['shows'],
    queryFn: async () => {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          query: showsAnonQuery,
        }),
      });
      if(!response.ok)
        throw new Error(`Failed to fetch`)
        return await response.json();
      
    },
  });

  if (isLoading)
    return <p>Loading...</p>
  if (isError) 
    return <p>{JSON.stringify(error)}</p>
  

  return (
    <div>
      <h2>Shows</h2>
      <p>{JSON.stringify(data.data.shows)}</p>

    </div>
  );
}

export default App;
