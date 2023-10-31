import { MoreVertOutlined } from '@mui/icons-material';
import { Box, Button, Card, CardContent, IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase";
import { useEffect } from 'react';
export default function Blog(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [coverImgLink, setCoverImgLink] = React.useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const theme = useTheme();
  const user = props.user;
  const token = useSelector((state) => state.token);
  const isOwner = props.user._id === useSelector((state) => state.user._id) ? true : false;
  const calculateAgeOfBlog = (createdAt) => {
    const currentDate = new Date();
    const blogDate = new Date(createdAt);
    const timeDiff = currentDate - blogDate;
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return `${daysAgo} days ago`;
  };
  useEffect(() => {
    const imgRef = ref(storage, `${props.coverPath}`);
    getDownloadURL(imgRef).then((url) => {
      setCoverImgLink(url);
    }).catch((err) => {
      console.log(err);
    });
  })
  const handleBlogDelete = async () => {
    const deleteBlog = await axios.post(`${process.env.REACT_APP_API_URL}/blog/deleteblog`, { id: props.id }, { headers: { Authorization: `Bearer ${token}` } });
    if (deleteBlog.status === 200) {
      navigate(`/profile/${user.username}`);
    }
  }
  return (
    <Card sx={{ margin: '1rem', border: `1px solid ${theme.palette.neutral.medium}`, boxShadow: 'none', backgroundColor: 'transparent' }}>
      <CardContent style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} width={'100%'} sx={{
            // eslint-disable-next-line no-useless-concat
            backgroundImage: `url("` + `${coverImgLink}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
            <Box display={'flex'} width={'max-content'} alignItems={'center'} sx={{
              transition: 'all 0.5s',
              border: `1px solid ${theme.palette.neutral.medium}`,
              backgroundColor: theme.palette.background.default,
              margin: '1rem',
              padding: '1rem',
              '&:hover': {
                border: `1px solid ${theme.palette.neutral.mediumMain}`,
              },
            }}>
              <Avatar alt={user.username} src={user.picture} style={{ marginRight: '1rem' }} />
              <Typography fontSize={theme.typography.h6} color="textPrimary">
                {user.username}
              </Typography>
            </Box>
          </Box>
        </div>
        <Typography fontSize={theme.typography.h2} margin={'1rem 0'} textAlign={'center'}>
          {props.title}
        </Typography>
        <div style={{
          fontSize: theme.typography.h4,
          textAlign: 'center',
          margin: '2rem 0',
          color: theme.palette.neutral.dark
        }} dangerouslySetInnerHTML={{ __html: (props.content.slice(0, 150) + "...") }}></div>
        <Button onClick={() => navigate(`/blogs/${props.id}`)} color="primary">
          Read More
        </Button>
        <Typography textAlign={'end'} fontSize={theme.typography.caption} color="textSecondary">
          {props.views} views &bull; {calculateAgeOfBlog(props.createdAt)} &bull; {props.impressed} Likes &nbsp;
          {isOwner ?
            <>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertOutlined />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                {/* <MenuItem onClick={handleClose}>
              Edit
            </MenuItem> */}
                <MenuItem onClick={() => { handleBlogDelete() }}>
                  Delete
                </MenuItem>
              </Menu>
            </>
            :
            <></>}
        </Typography>
      </CardContent>
    </Card>
  );
}
