import { EditOutlined } from '@mui/icons-material';
import { Autocomplete, Box, Button, Divider, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

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
  ],
};

var formats = [
  "header", "height", "bold", "italic",
  "underline", "strike", "blockquote",
  "list", "color", "bullet", "indent",
  "link", "image", "align", "size",
];

const techTags = [
  { "title": "Accessibility" },
  { "title": "Agile Methodology" },
  { "title": "AI" },
  { "title": "Algorithms" },
  { "title": "API Design" },
  { "title": "API Development" },
  { "title": "API Gateway" },
  { "title": "API Security" },
  { "title": "AR" },
  { "title": "Artificial Intelligence" },
  { "title": "Augmented Reality (AR)" },
  { "title": "Automation" },
  { "title": "Backend Scalability" },
  { "title": "Back-end Development" },
  { "title": "Back-end Frameworks" },
  { "title": "Big Data Analysis" },
  { "title": "Blockchain Technology" },
  { "title": "CI/CD Pipelines" },
  { "title": "Cloud Computing" },
  { "title": "Cloud Cost Optimization" },
  { "title": "Cloud Governance" },
  { "title": "Cloud Security" },
  { "title": "Cloud-native Applications" },
  { "title": "Code Documentation" },
  { "title": "Code Optimization" },
  { "title": "Code Review" },
  { "title": "Computer Vision" },
  { "title": "Continuous Integration (CI) / Continuous Deployment (CD)" },
  { "title": "Continuous Monitoring" },
  { "title": "Cryptography" },
  { "title": "Cyber Threats" },
  { "title": "Cybersecurity" },
  { "title": "Databases" },
  { "title": "Data Science" },
  { "title": "Data Structures" },
  { "title": "Data Visualization" },
  { "title": "Data Warehousing" },
  { "title": "Deep Learning" },
  { "title": "DevOps" },
  { "title": "DevSecOps (Security in DevOps)" },
  { "title": "Docker Containers" },
  { "title": "Edge AI" },
  { "title": "Edge Computing" },
  { "title": "Embedded Systems" },
  { "title": "Ethical Hacking" },
  { "title": "Explainable AI" },
  { "title": "Front-end Development" },
  { "title": "Front-end Libraries" },
  { "title": "Front-end Performance" },
  { "title": "Full Stack Development" },
  { "title": "Functional Programming" },
  { "title": "Game Development" },
  { "title": "GraphQL" },
  { "title": "HealthTech" },
  { "title": "Internet of Things (IoT)" },
  { "title": "Kubernetes" },
  { "title": "Machine Learning" },
  { "title": "Microfrontends" },
  { "title": "Microservices" },
  { "title": "Microservices Architecture" },
  { "title": "Microservices Security" },
  { "title": "Mobile App Development" },
  { "title": "Mobile Frameworks" },
  { "title": "Mobile Security" },
  { "title": "Natural Language Processing" },
  { "title": "Natural Language Understanding" },
  { "title": "Neural Networks" },
  { "title": "No-Code / Low-Code Development" },
  { "title": "PWA" },
  { "title": "Quantum Algorithms" },
  { "title": "Quantum Computing" },
  { "title": "Quantum Networking" },
  { "title": "RESTful APIs" },
  { "title": "RESTful Web Services" },
  { "title": "Reinforcement Learning" },
  { "title": "Responsive Design" },
  { "title": "Robotics" },
  { "title": "Robotics Process Automation" },
  { "title": "Security" },
  { "title": "Software Architecture" },
  { "title": "Software Engineering" },
  { "title": "Software Testing" },
  { "title": "UI/UX Design" },
  { "title": "UI/UX Prototyping" },
  { "title": "User-Centered Design" },
  { "title": "User Experience Design" },
  { "title": "VR" },
  { "title": "Virtual Reality (VR)" },
  { "title": "Web Development" },
  { "title": "Web Frameworks" },
  { "title": "Wearable App Development" },
  { "title": "Wearable Technology" },
  { "title": "Web Development" },
  { "title": "Wearable Technology" },
  { "title": "Web Frameworks" }
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
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagSelection = (event, newValue) => {
    setSelectedTags(newValue);
  };

  const [title, setTitle] = useState("");
  const [coverImg, setCoverImg] = useState(null);
  const [content, setContent] = useState(null);
  const [preview, setPreview] = useState(false);
  const [coverPreview, setCoverPreview] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const handleProcedureContentChange = (content) => {
    setContent(content);
    console.log(content);
  };

  const onBlogPost = async () => {
    try {
      const formdata = new FormData();
      formdata.append("title", title);
      formdata.append("content", content);
      formdata.append("writer", user._id);
      formdata.append("keywords", selectedTags);
      formdata.append("coverImg", coverImg);
      formdata.append("coverImgPath", coverImg.name);
      const responce = await axios.post(`${process.env.REACT_APP_API_URL}/blog/saveblog`, formdata, { headers: { Authorization: `Bearer ${token}` } });
      if (responce.status === 200) {
        navigate(`/blogs/${responce.data.blog.id}`);
      }
    } catch (error) {
      console.log("Error ---------> " + error);
    }
  }

  return (
    <>
      <Box display={preview ? "none" : "block"}>
        <Typography textAlign={'center'} margin={'2rem auto'} fontSize={theme.typography.h1} color={theme.palette.neutral.dark}>Design your own Blog.....</Typography>
        <Box width={'90vw'} margin={'auto'}>
          <Box margin={'2rem auto'}>
            <Dropzone maxFiles={1} acceptedFiles={'.jpg, .jpeg, .png'} multiple={false}
              onDrop={(acceptedFiles) => {
                setCoverImg(acceptedFiles[0])
                setCoverPreview(URL.createObjectURL(acceptedFiles[0]));
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
            {coverPreview
              ?
              <img src={coverPreview} alt='CoverImage' style={{ width: '100%', height: 'auto', aspectRatio: '4/1', clipPath: 'content-box' }} />
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
            <Typography fontSize={theme.typography.h4}>{content ? "" : "Start writing here ...."}</Typography>
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
          <Box width={'100%'} margin={'2rem auto'} display={'flex'} flexDirection={'column'}>
            <Typography margin={'2rem 0 1rem 0'} fontSize={theme.typography.h4}>{content ? "" : "Select the tags which best describes your blog"}</Typography>
            <Autocomplete
              multiple
              id="tags-selector"
              options={techTags}
              fullWidth
              getOptionLabel={(option) => option.title}
              value={selectedTags}
              onChange={handleTagSelection}
              renderInput={(params) => <TextField {...params} label="Select Tags" />}
            />
          </Box>
        </Box>
        <Box width={'30%'} margin={'auto'} display={'flex'} justifyContent={'space-between'}>
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
            onClick={() => {
              onBlogPost();
            }}
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
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
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
            onClick={() => {
              onBlogPost();
            }}
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
