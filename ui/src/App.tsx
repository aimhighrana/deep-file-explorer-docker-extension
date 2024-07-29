import React from 'react';
import Button from '@mui/material/Button';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import { Stack, TextField, Typography } from '@mui/material';

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.
const client = createDockerDesktopClient();

function useDockerDesktopClient() {
  return client;
}

export function App() {
  const [response, setResponse] = React.useState<string>();
  const [containers , setContainers] = React.useState<string>();
  const ddClient = useDockerDesktopClient();

  const fetchAndDisplayResponse = async () => {
    const result = await ddClient.extension.vm?.service?.get('/hello');
    console.log(result)
    setResponse(JSON.stringify(result));
  };

  const fetchContainers = async () => {
    const result = await ddClient.extension.vm?.service?.get('/containers');
    console.log(result)
    setContainers(JSON.stringify(result));
  };

  return (
    <>
      <Typography variant="h3">Files explorer</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        This exetention will help you explor the files across the containers...
      </Typography>
      <Stack direction="row" alignItems="start" spacing={2} sx={{ mt: 4 }}>
        <Button variant="contained" onClick={fetchContainers}>
          Get containers
        </Button>

        <TextField
          label="Backend response"
          sx={{ width: 480 }}
          multiline
          variant="outlined"
          minRows={5}
          value={containers ?? ''}
        />
      </Stack>

      <Stack direction="row" alignItems="start" spacing={2} sx={{ mt: 4 }}>
        <Button variant="contained" onClick={fetchAndDisplayResponse}>
          Call backend
        </Button>

        <TextField
          label="Backend response"
          sx={{ width: 480 }}
          multiline
          variant="outlined"
          minRows={5}
          value={response ?? ''}
        />
      </Stack>
    </>
  );
}
