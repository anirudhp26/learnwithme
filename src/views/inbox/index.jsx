import { Box, Button, TextField } from '@mui/material'
import React from 'react'
// import io from 'socket.io-client';


export default function Inbox() {
    // const socket = io.connect('http://localhost:3001');
    // const handleSendMessage = async () => {
    //     socket.emit("send_notification_follow", { message: "New user Impressed", impressed: "" })        
    // }
  return (
    <Box display={'flex'} width={'70%'} margin={'2rem auto'}>
        <TextField variant='outlined' placeholder='send messages' fullWidth />
        {/* <Button variant='outlined' onClick={() => {handleSendMessage()}}>Send msg</Button> */}
    </Box>
  )
}
