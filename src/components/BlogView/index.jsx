import { BookmarkOutlined, CommentOutlined, FavoriteOutlined } from '@mui/icons-material';
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
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(false);
    const [isCommented, setIsCommented] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    const handleComment = () => {
        setIsCommented(!isCommented);
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };
    useEffect(() => {
        const getblog = async () => {
            const blog = await axios.post(`${process.env.REACT_APP_API_URL}/blog/getBlogbyID`, { blogId: blogId }, { headers: { Authorization: `Bearer ${token}` } });
            if (blog.status === 200) {
                setBlog(blog.data.blog);
                setUser(blog.data.user);
            }
            console.log(blog);
            return blog;
        }
        getblog();
    }, [blogId, token]);
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
                    <Box>
                        <Tooltip title={isLiked ? 'Unlike' : 'Like'}>
                            <IconButton color={isLiked ? 'error' : 'default'} onClick={handleLike}>
                                <FavoriteOutlined />
                            </IconButton>
                        </Tooltip>  
                        <Tooltip title={isCommented ? 'Remove Comment' : 'Comment'}>
                            <IconButton color={isCommented ? 'primary' : 'default'} onClick={handleComment}>
                                <CommentOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={isBookmarked ? 'Remove Bookmark' : 'Bookmark'}>
                            <IconButton color={isBookmarked ? 'info' : 'default'} onClick={handleBookmark}>
                                <BookmarkOutlined />
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
