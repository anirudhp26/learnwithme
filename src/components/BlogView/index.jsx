import { BookmarkAdd, BookmarkAdded, CommentOutlined, FavoriteOutlined } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'

export default function BlogView() {
    const { blogId } = useParams();
    const token = useSelector((state) => state.token);
    const theme = useTheme();
    const [blog, setBlog] = useState(null);
    const [user, setUser] = useState(null);
    const logged_user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(blog?.impressed.includes(logged_user._id) ? true : false);
    const [isCommented, setIsCommented] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleLike = async () => {
        const newBlog = { ...blog };
        if (newBlog.impressed.includes(logged_user._id)) {
            const index = newBlog.impressed.indexOf(logged_user._id);
            if (index > -1) {
                newBlog.impressed.splice(logged_user._id);
            }
        } else {
            newBlog.impressed.push(logged_user._id);
        }
        setBlog(newBlog);
        setIsLiked(blog.impressed.includes(logged_user._id) ? true : false);
        const updateBlog = await axios.post(`${process.env.REACT_APP_API_URL}/blog/updateBlog`, { blog: blog }, { headers: { Authorization: `Bearer ${token}`}});
        console.log(updateBlog.data);
    };

    const handleComment = () => {
        setIsCommented(!isCommented);
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };
    useEffect(() => {
        const getblog = async () => {
            const rblog = await axios.post(`${process.env.REACT_APP_API_URL}/blog/getBlogbyID`, { blogId: blogId }, { headers: { Authorization: `Bearer ${token}` } });
            if (rblog.status === 200) {
                setBlog(rblog.data.blog);
                setUser(rblog.data.user);
                setIsLiked(rblog.data.blog.impressed.includes(logged_user._id) ? true : false);
            }
            console.log(rblog);
            return rblog;
        }
        getblog();
    }, [blogId, token, logged_user]);
    return (
        <Box width={'70%'} margin={'auto'}>
            {blog
                ?
                <>
                    <img src={`${process.env.REACT_APP_API_URL}/assets/` + blog.coverPath} alt='Cover' style={{ width: '100%', height: 'auto', aspectRatio: '4/1', margin: '2rem 0' }}></img>
                    <Box width={'100%'} margin={'2rem auto'} display={'flex'} alignItems={'center'}>
                        {user?.picture !== undefined ? (
                            <img
                                style={{
                                    borderRadius: "50%",
                                    width: "100px",
                                    height: '100px',
                                }}
                                id="profile-user-image"
                                src={process.env.REACT_APP_API_URL + `/assets/${user.picture}`}
                                onError={() => {
                                    document.getElementById("profile-user-image").src = user.picture;
                                }}
                                alt="USER"
                            ></img>
                        ) : (
                            <img
                                src="/img/user-default-logo.png"
                                alt=""
                                width="100px"
                            ></img>
                        )}
                        <Typography fontSize={theme.typography.h3} margin={'0 2rem'} onClick={() => { navigate(`/profile/${user.username}`) }}>{user.name}</Typography>
                    </Box>
                    <Typography fontSize={theme.typography.h1} textAlign={'center'} margin={'2rem 0'}>
                        {blog.title}
                    </Typography>
                    <Box overflow={'hidden'} margin={'2rem auto'} width={'100%'}>
                        <div className='blog-content' dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                    </Box>
                    <Box display={'flex'} margin={'auto'} padding={'0 0 4rem 0'} justifyContent={'center'} alignItems={'center'}>
                        <Tooltip title={isLiked ? 'Unlike' : 'Like'}>
                            <Typography textAlign={'center'}>{blog?.impressed.length}</Typography>
                            <IconButton color={isLiked ? 'error' : 'default'} onClick={handleLike}>
                                <FavoriteOutlined sx={{ fontSize: '2rem' }} />
                            </IconButton>
                        </Tooltip>  
                        <Tooltip title={isCommented ? 'Remove Comment' : 'Comment'}>
                            <Typography textAlign={'center'}>{blog?.impressed.length}</Typography>
                            <IconButton color={isCommented ? 'primary' : 'default'} onClick={handleComment}>
                                <CommentOutlined sx={{ fontSize: '2rem' }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={isBookmarked ? 'Remove Bookmark' : 'Bookmark'}>
                            <Typography textAlign={'center'}>&nbsp;</Typography>
                            <IconButton color={isBookmarked ? 'info' : 'default'} onClick={handleBookmark}>
                                {isBookmarked 
                                    ?
                                        <BookmarkAdded sx={{ fontSize: '2rem' }} />
                                    :
                                        <BookmarkAdd sx={{ fontSize: '2rem' }} />
                                }
                            </IconButton>
                        </Tooltip>
                    </Box>
                </>
                :
                <></>
            }
        </Box>
    )
}
