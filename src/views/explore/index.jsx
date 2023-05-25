import { AccountCircle } from '@mui/icons-material'
import { Box, InputAdornment, TextField } from '@mui/material'
import React from 'react'

export default function Explore() {
    return (
        <>
            <Box width='90%' margin='2rem auto'>
                <TextField
                    id="input-with-icon-textfield"
                    label="TextField"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                />
            </Box>
        </>
    )
}
