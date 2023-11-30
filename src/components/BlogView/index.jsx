import {
    BookmarkAdd,
    BookmarkAdded,
    CommentOutlined,
    FavoriteOutlined,
    SendOutlined,
} from "@mui/icons-material";
import {
    Box,
    CircularProgress,
    Divider,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";
import { useContext } from "react";

export default function BlogView() {
    const { blogId } = useParams();
    const token = useSelector((state) => state.token);
    const theme = useTheme();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(null);
    const logged_user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(
        blog?.impressed.includes(logged_user._id) ? true : false
    );
    const mode = useSelector((state) => state.mode);
    const [iscommentLiked, setCommentLiked] = useState(false);
    const [addcomment, setAddComment] = useState("");
    const [isBookmarked, setIsBookmarked] = useState(false);
    const socket = useContext(SocketContext);
    const handlecommentLike = async () => {
        setCommentLiked((prev) => !prev);
    }
    const handleLike = async () => {
        const newBlog = { ...blog };
        if (newBlog.impressed.includes(logged_user._id)) {
            const index = newBlog.impressed.indexOf(logged_user._id);
            if (index > -1) {
                console.log(newBlog.impressed);
                newBlog.impressed.splice(index);
                console.log(newBlog.impressed);
            }
        } else {
            newBlog.impressed.push(logged_user._id);
            socket.emit("blog_like", { to: user.username, from: logged_user.username, blogTitle: blog.title, blogId: blog._id, fromInfo: logged_user });
        }
        setIsLiked(newBlog.impressed.includes(logged_user._id) ? true : false);
        const updateBlog = await axios.post(
            `${process.env.REACT_APP_API_URL}/blog/updateBlog`,
            { blog: newBlog },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        if (updateBlog.status === 200) {
            console.log(updateBlog.data.updated_blog);
            setBlog(updateBlog.data.updated_blog);
        }
    };
    const handleAddComment = async () => {
        const responce = await axios.post(`${process.env.REACT_APP_API_URL}/blog/addcomment`, { blogId: blogId, userId: logged_user._id, content: addcomment }, { headers: { Authorization: `Bearer ${token}` } });
        if (responce.status === 200) {
            setComments(responce.data.comments);
            setAddComment("");
        }
    }
    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };
    useEffect(() => {
        const getblog = async () => {
            const rblog = await axios.post(
                `${process.env.REACT_APP_API_URL}/blog/getBlogbyID`,
                { blogId: blogId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (rblog.status === 200) {
                setBlog(rblog.data.blog);
                setUser(rblog.data.user);
                setComments(rblog.data.comments);
                setIsLiked(
                    rblog.data.blog.impressed.includes(logged_user._id)
                        ? true
                        : false
                );
            }
            console.log(rblog);
            setLoading(false);
            return rblog;
        };
        getblog();
    }, [blogId, token, logged_user ]);

    return (
        <>
            {loading
                ?
                <>
                    <div className="loader-container">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
                </>
                :
                <>
                    <Box width={"70%"} margin={"auto"} sx={{
                        "@media only screen and (max-width: 1250px)":
                        {
                            width: '90%',
                        },
                    }}>
                        {blog ? (
                            <>
                                <img
                                    src={blog.coverPath}
                                    alt="Cover"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        aspectRatio: "4/1",
                                        margin: "1rem 0",
                                    }}
                                ></img>
                                <Box
                                    width={"100%"}
                                    margin={"1rem auto"}
                                    display={"flex"}
                                    alignItems={"center"}
                                >
                                    {user?.picture !== undefined ? (
                                        <img
                                            style={{
                                                borderRadius: "50%",
                                                width: "4rem",
                                                height: "4rem",
                                            }}
                                            id="profile-user-image"
                                            src={user.picture}
                                            alt="USER"
                                        ></img>
                                    ) : (
                                        <img
                                            src="/img/user-default-logo.png"
                                            alt=""
                                            width="4rem"
                                        ></img>
                                    )}
                                    <Typography
                                        fontSize={theme.typography.h5}
                                        margin={"0 1rem"}
                                        onClick={() => {
                                            navigate(`/profile/${user.username}`);
                                        }}
                                    >
                                        {user.name}
                                    </Typography>
                                </Box>
                                <Box display={"flex"} flexDirection={"column"}>
                                    <Typography
                                        fontSize={theme.typography.h2}
                                        textAlign={"center"}
                                        margin={"1rem 0"}
                                    >
                                        {blog.title}
                                    </Typography>
                                    <Box
                                        display={"flex"}
                                        margin={"0 auto"}
                                        padding={"0 0 2rem 0"}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                    >
                                        <Typography textAlign={"center"}>
                                            {blog?.impressed.length}
                                        </Typography>
                                        <Tooltip title={isLiked ? "Unlike" : "Like"}>
                                            <IconButton
                                                color={isLiked ? "error" : "default"}
                                                onClick={handleLike}
                                            >
                                                <FavoriteOutlined
                                                    sx={{ fontSize: "1.5rem" }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip
                                            title={
                                                isBookmarked
                                                    ? "Remove Bookmark"
                                                    : "Bookmark"
                                            }
                                        >
                                            <IconButton
                                                color={isBookmarked ? "info" : "default"}
                                                onClick={handleBookmark}
                                            >
                                                {isBookmarked ? (
                                                    <BookmarkAdded
                                                        sx={{ fontSize: "1.5rem" }}
                                                    />
                                                ) : (
                                                    <BookmarkAdd
                                                        sx={{ fontSize: "1.5rem" }}
                                                    />
                                                )}
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                    <Divider variant="middle" />
                                </Box>
                                <Box
                                    overflow={"hidden"}
                                    margin={"2rem auto"}
                                    width={"100%"}
                                >
                                    <div
                                        className="blog-content"
                                        dangerouslySetInnerHTML={{ __html: blog.content }}
                                    ></div>
                                </Box>

                                <Divider variant="middle" />
                                <Box
                                    display={"flex"}
                                    justifyContent={"space-around"}
                                    flexDirection={"column"}
                                    alignItems={"center"}
                                    padding={'2rem 0'}
                                >
                                    <TextField
                                        fullWidth
                                        id="input-with-icon-textfield"
                                        label="Add your comment..."
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <CommentOutlined />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <IconButton
                                                    onClick={() => {
                                                        handleAddComment();
                                                    }}
                                                >
                                                    <SendOutlined />
                                                </IconButton>
                                            ),
                                        }}
                                        sx={{
                                            ".Mui-focused": {
                                                color: theme.palette.neutral.dark,
                                            },
                                            display: "flex",
                                            margin: "2rem 0",
                                        }}
                                        value={addcomment}
                                        variant="outlined"
                                        onChange={(e) => {
                                            setAddComment(e.target.value);
                                        }}
                                    />
                                    {comments.length === 0 ? (
                                        <Box border={`1px solid ${theme.palette.neutral.medium}`} width={'100%'} padding={'10px'} display={'flex'} alignItems={'center'}>
                                            <img
                                                src="/img/user-default-logo.png"
                                                alt=""
                                                width="50px"
                                            ></img>
                                            <Typography marginLeft={'1rem'} color={'grey'}><i>admin</i></Typography>
                                            <Typography
                                                fontSize={theme.typography.h6}
                                                display={'flex'}
                                                margin={'auto'}
                                            >
                                                Be the first one to comment
                                            </Typography>
                                            <Tooltip title={iscommentLiked ? "Unlike" : "Like"}>
                                                <IconButton
                                                    color={iscommentLiked ? "error" : "default"}
                                                    onClick={handlecommentLike}
                                                >
                                                    <FavoriteOutlined
                                                        sx={{ fontSize: "1rem" }}
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    ) : (
                                        comments.map((comment) => {
                                            return (
                                                <Box width={'100%'}>
                                                    <Divider variant="middle" />
                                                    <Box key={comment._id} margin={'10px 0'} width={'100%'} padding={'10px'} display={'flex'} alignItems={'center'} position={'relative'}>
                                                        <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                                                            <Box display={'flex'} alignItems={'center'}>
                                                                {comment?.author_id.picture !== undefined ? (
                                                                    <img
                                                                        style={{
                                                                            borderRadius: "50%",
                                                                            width: "3rem",
                                                                            height: "3rem",
                                                                        }}
                                                                        id="comment-user-image"
                                                                        src={comment.author_id.picture}
                                                                        alt="USER"
                                                                    ></img>
                                                                ) : (
                                                                    <img
                                                                        src="/img/user-default-logo.png"
                                                                        alt=""
                                                                        width="40px"
                                                                    ></img>
                                                                )}
                                                                <Typography marginLeft={'1rem'} color={'grey'}><p onClick={() => navigate(`/profile/${comment.author_id.username}`)}>{comment.author_id.username}</p></Typography>
                                                            </Box>
                                                            <Typography
                                                                fontSize={theme.typography.h6}
                                                                display={'flex'}
                                                                width={'90%'}
                                                                margin={'1rem 0'}
                                                            >
                                                                <i>
                                                                {comment.content}
                                                                </i>
                                                            </Typography>
                                                        </Box>
                                                        <Tooltip sx={{ position: 'absolute', right: '0' }} title={iscommentLiked ? "Unlike" : "Like"}>
                                                            <IconButton
                                                                color={iscommentLiked ? "error" : "default"}
                                                                onClick={handlecommentLike}
                                                            >
                                                                <Typography marginRight={'3px'} textAlign={"center"}>
                                                                    {comment.impressed}
                                                                </Typography>
                                                                <FavoriteOutlined
                                                                    sx={{ fontSize: "1rem" }}
                                                                />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                </Box>
                                            )
                                        })
                                    )}
                                </Box>
                            </>
                        ) : (
                            <></>
                        )}
                    </Box>
                </>}
        </>
    );
}
