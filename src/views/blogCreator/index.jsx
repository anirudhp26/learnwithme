import { EditOutlined } from '@mui/icons-material';
import { Box, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import Dropzone from 'react-dropzone';

export default function BlogCreator() {
  const [coverImg, setCoverImg] = useState(null);
  const theme = useTheme();
  const transparentTextFieldStyle = {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'transparent',
      border: 'none',
      width: '100%',
    },
    '& .MuiTextField-root': {
      width: '100%',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      backgroundColor: 'transparent',
      border: 'none',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: theme.palette.neutral.medium,
    },
    '& .MuiInputLabel-root': {
      fontSize: theme.typography.h2,
      color: theme.palette.neutral.dark,
    },
    '& .MuiOutlinedInput-input': {
      fontSize: theme.typography.h1,
    },
    '& .MuiFormHelperText-root.Mui-error': {
      fontSize: '1rem',
      textDecoration: 'underline'
    }
  };
  const [title, setTitle] = useState("");

  const handleBlogSave = async () => {
    console.log(title);
  }

  return (
    <Box>
      <Typography textAlign={'center'} margin={'2rem auto'} fontSize={theme.typography.h1} color={theme.palette.neutral.dark}>Design your own Blog.....</Typography>
      <Box width={'90%'} margin={'auto'}>
        <Box>
          <TextField
            variant="outlined"
            label="Title"
            multiline
            error={title.length > 100 ? true : false}
            sx={transparentTextFieldStyle}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            helperText={title.length > 100 ? "word limit reached" : ""}
          />
          <Typography color={theme.palette.neutral.dark} textAlign={'end'}>({title.length}/100)</Typography>
        </Box>
        <Box margin={'2rem auto'}>
          <Dropzone maxFiles={1} acceptedFiles={'.jpg, .jpeg, .png'} multiple={false} onDrop={(acceptedFiles) => { setCoverImg(acceptedFiles[0]) }}>
            {({ getRootProps, getInputProps }) => (
              <Box {...getRootProps()} border={`1px dashed ${theme.palette.neutral.dark}`} padding={'1rem'} sx={{
                "&:hover": {
                  cursor: 'pointer'
                },
                height: '100px'
              }}>
                <input {...getInputProps()}></input>
                {!coverImg
                  ?
                  <Typography color={theme.palette.neutral.dark}>Add Profile Picture Here</Typography>
                  :
                  <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                    <img src={`${coverImg.path}`} alt='USER'></img>
                    <Typography color={theme.palette.neutral.dark}>{coverImg.name}</Typography>
                    <EditOutlined sx={{ color: theme.palette.neutral.dark }} />
                  </Box>
                }
              </Box>
            )}
          </Dropzone>
        </Box>
      </Box>
    </Box>
  )
}
