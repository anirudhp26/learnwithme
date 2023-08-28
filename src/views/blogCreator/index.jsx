import { EditOutlined } from '@mui/icons-material';
import { Box, Button, Divider, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css'
import { useNavigate } from 'react-router-dom';
var modules = {
  toolbar: [
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
      { align: [] }
    ],
    [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
  ]
};

var formats = [
  "header", "height", "bold", "italic",
  "underline", "strike", "blockquote",
  "list", "color", "bullet", "indent",
  "link", "image", "align", "size",
];

export default function BlogCreator() {
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
  const [coverImg, setCoverImg] = useState(null);
  const [content, setContent] = useState(null);
  const [preview, setPreview] = useState(false);
  const navigate = useNavigate();
  const handleProcedureContentChange = (content) => {
    setContent(content);
    console.log(content);
  };
  return (
    <>
      <Box display={preview ? "none" : "block"}>
        <Typography textAlign={'center'} margin={'2rem auto'} fontSize={theme.typography.h1} color={theme.palette.neutral.dark}>Design your own Blog.....</Typography>
        <Box width={'90vw'} margin={'auto'}>
          <Box margin={'2rem auto'}>
            <Dropzone maxFiles={1} acceptedFiles={'.jpg, .jpeg, .png'} multiple={false}
              onDrop={(acceptedFiles) => {
                setCoverImg(Object.assign(acceptedFiles[0], {
                  preview: URL.createObjectURL(acceptedFiles[0]),
                }))
              }}>
              {({ getRootProps, getInputProps }) => (
                <Box {...getRootProps()} border={`1px dashed ${theme.palette.neutral.dark}`} padding={'1rem'} sx={{
                  "&:hover": {
                    cursor: 'pointer'
                  },
                  height: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <input {...getInputProps()}></input>
                  {!coverImg
                    ?
                    <Typography color={theme.palette.neutral.dark}>Add Cover Pic Here</Typography>
                    :
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                      <Typography color={theme.palette.neutral.dark}>{coverImg.name}</Typography>
                      <EditOutlined sx={{ color: theme.palette.neutral.dark }} />
                    </Box>
                  }
                </Box>
              )}
            </Dropzone>
          </Box>
          <Box>
            {coverImg
              ?
              <img src={coverImg.preview} alt='CoverImage' style={{ width: '100%', height: 'auto', aspectRatio: '4/1', clipPath: 'content-box' }} />
              :
              <></>
            }
          </Box>
          <Box margin={'2rem auto'}>
            <TextField
              variant="outlined"
              label={title.length > 0 ? "" : "title"}
              multiline
              error={title.length > 100 ? true : false}
              sx={transparentTextFieldStyle}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              helperText={title.length > 100 ? "word limit reached" : ""}
            />
            <Divider variant='middle' />
            <Typography margin={'1rem 0'} color={theme.palette.neutral.dark} textAlign={'end'}>({title.length}/100)</Typography>
          </Box>
          <Box width={'100%'} margin={'2rem auto'}>
            <Typography fontSize={theme.typography.h2}>{content ? "" : "Start writing here ...."}</Typography>
            <Box margin={'1rem auto'} sx={{ display: "grid", justifyContent: "center" }}>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                placeholder="write your content ...."
                onChange={handleProcedureContentChange}
                style={{ height: "max-content", width: "90vw" }}
              >
              </ReactQuill>
            </Box>
          </Box>
        </Box>
        <Box width={'50%'} margin={'auto'} display={'flex'} justifyContent={'space-between'}>
          <Button
            variant="outlined"
            // disabled={isClicked}
            sx={{
              backgroundColor: theme.palette.background.alt,
              margin: "1rem auto",
              color: theme.palette.neutral.dark,
              fontFamily: "JetBrains Mono",
              "&:hover": {
                backgroundColor: theme.palette.background.default,
              },
              border: "1px solid grey",
              textTransform: "none",
            }}
            id="auth-btn-2"
            onClick={() => {
              setPreview(true);
            }}
          >
            <i
              style={{ margin: "0 10px" }}
              id="edit-loading"
              className="fa-solid fa-spinner fa-spin disable"
            ></i>
            <span>Preview</span>
          </Button>
          <Button
            variant="outlined"
            // disabled={isClicked}
            sx={{
              backgroundColor: theme.palette.background.alt,
              margin: "1rem auto",
              color: theme.palette.neutral.dark,
              fontFamily: "JetBrains Mono",
              "&:hover": {
                backgroundColor: theme.palette.background.default,
              },
              border: "1px solid grey",
              textTransform: "none",
            }}
            id="auth-btn-2"
          // onClick={() => {
          // 	setisClicked((prev) => !prev);
          // 	handleEditProfileSubmit();
          // 	document
          // 		.getElementById("edit-loading")
          // 		.classList.toggle("disable");
          // }}
          >
            <i
              style={{ margin: "0 10px" }}
              id="edit-loading"
              className="fa-solid fa-spinner fa-spin disable"
            ></i>
            <span>Post</span>
          </Button>
        </Box>
      </Box>
      <Box width={'70%'} margin={'2rem auto'} display={preview ? 'flex' : 'none'} flexDirection={'column'} alignItems={'center'}>
        {coverImg 
        ? 
          <img src={coverImg.preview} alt='Cover' style={{ width: '100%', height: 'auto', aspectRatio: '4/1', margin: '2rem 0' }}></img>
        : 
          <></>
        }
        <Typography fontSize={theme.typography.h1} textAlign={'center'} margin={'2rem 0'}>
          {title}
        </Typography>
        <Box overflow={'hidden'} margin={'2rem auto'} width={'100%'}>
          <div dangerouslySetInnerHTML={{ __html: content}}></div>
        </Box>
        <Box width={'50%'} margin={'auto'} display={'flex'} justifyContent={'space-between'}>
          <Button
            variant="outlined"
            // disabled={isClicked}
            sx={{
              backgroundColor: theme.palette.background.alt,
              margin: "1rem auto",
              color: theme.palette.neutral.dark,
              fontFamily: "JetBrains Mono",
              "&:hover": {
                backgroundColor: theme.palette.background.default,
              },
              border: "1px solid grey",
              textTransform: "none",
            }}
            id="auth-btn-2"
            onClick={() => {
              setPreview(false);
            }}
          >
            <i
              style={{ margin: "0 10px" }}
              id="edit-loading"
              className="fa-solid fa-spinner fa-spin disable"
            ></i>
            <span>Edit</span>
          </Button>
          <Button
            variant="outlined"
            // disabled={isClicked}
            sx={{
              backgroundColor: theme.palette.background.alt,
              margin: "1rem auto",
              color: theme.palette.neutral.dark,
              fontFamily: "JetBrains Mono",
              "&:hover": {
                backgroundColor: theme.palette.background.default,
              },
              border: "1px solid grey",
              textTransform: "none",
            }}
            id="auth-btn-2"
          // onClick={() => {
          // 	setisClicked((prev) => !prev);
          // 	handleEditProfileSubmit();
          // 	document
          // 		.getElementById("edit-loading")
          // 		.classList.toggle("disable");
          // }}
          >
            <i
              style={{ margin: "0 10px" }}
              id="edit-loading"
              className="fa-solid fa-spinner fa-spin disable"
            ></i>
            <span>Post</span>
          </Button>
        </Box>
      </Box>
    </>
  )
}
