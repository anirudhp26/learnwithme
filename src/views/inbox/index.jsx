import { Box, TextField } from '@mui/material';
import React from 'react';

export default function Inbox() {
  return (
    <Box display={'flex'} width={'70%'} margin={'2rem auto'}>
        <TextField variant='outlined' placeholder='send messages' fullWidth />
    </Box>
  )
}
