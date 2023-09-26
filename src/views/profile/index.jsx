import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	Box,
	Button,
	CircularProgress,
	Divider,
	Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { setBlogs } from "../../redux";
import Blog from "../blog";
import { SocketContext } from "../../context/SocketContext";
export default function Profile() {
	const { user } = useParams();
	const dispatch = useDispatch();
	const logged_user = useSelector((state) => state.user);
	const token = useSelector((state) => state.token);
	const [suser, setSuser] = useState(logged_user);
	const [isLoading, setIsLoading] = useState(true);
	const mode = useSelector((state) => state.mode);
	const blogs = useSelector((state) => state.blogs);
	const navigate = useNavigate();
	const socket = useContext(SocketContext);
	useEffect(() => {
		Axios.post(
			`${process.env.REACT_APP_API_URL}/blog/getBlogbyUser`,
			{ user: user },
			{ headers: { Authorization: `Bearer ${token}` } }
		).then((responce) => {
			if (responce) {
				setSuser(responce.data.user[0]);
				dispatch(
					setBlogs({
						blogs: responce.data.blogs,
					})
				);
				setIsLoading(false);
			}
		});
	}, [user, dispatch, token]);

	const followAction = async () => {
		suser.impressed.push(logged_user._id);
		const followReq = await Axios.post(
			`${process.env.REACT_APP_API_URL}/auth/updateUser`,
			{ user: suser },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		if (followReq) {
			setSuser(followReq.data.updatedUser);
			document
				.getElementById("follow-loading")
				.classList.toggle("disable");
			socket.emit("send_notification_follow", { to: suser.username, from: logged_user.username, sender_id: logged_user._id });
		}
	};

	const unfollowAction = async () => {
		const newImpressedArray = await suser.impressed.filter(function (user) {
			return user !== logged_user._id;
		});
		suser.impressed = newImpressedArray;
		const followReq = await Axios.post(
			`${process.env.REACT_APP_API_URL}/auth/updateUser`,
			{ user: suser },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		if (followReq) {
			setSuser(followReq.data.updatedUser);
			document
				.getElementById("follow-loading")
				.classList.toggle("disable");
		}
	};
	const follow_edit_btn = () => {
		if (user === logged_user.username) {
			return (
				<Button
					variant="outlined"
					sx={{
						width: "50%",
						backgroundColor: "white",
						margin: "0 auto",
						color: "black",
						"&:hover": {
							backgroundColor: "black",
							color: "white",
						},
						border: "1px solid grey",
					}}
					id="follow-btn"
					onClick={() => {
						document
							.getElementById("follow-loading")
							.classList.toggle("disable");
						navigate("/editprofile");
					}}
				>
					<i
						style={{ margin: "0 10px" }}
						id="follow-loading"
						className="fa-solid fa-spinner fa-spin disable"
					></i>
					<span>Edit Profile</span>
				</Button>
			);
		} else {
			return (
				<Button
					variant="outlined"
					sx={{
						width: "50%",
						backgroundColor: "white",
						margin: "0 auto",
						color: "black",
						"&:hover": {
							backgroundColor: "black",
							color: "white",
						},
						border: mode === "light" ? "1px solid grey" : "none",
						borderRadius: '0px'
					}}
					id="follow-btn"
					onClick={() => {
						if (suser.impressed.includes(logged_user._id)) {
							document
								.getElementById("follow-loading")
								.classList.toggle("disable");
							unfollowAction();
						} else {
							document
								.getElementById("follow-loading")
								.classList.toggle("disable");
							followAction();
						}
					}}
				>
					<i
						style={{ margin: "0 10px" }}
						id="follow-loading"
						className="fa-solid fa-spinner fa-spin disable"
					></i>
					<span>
						{suser.impressed.includes(logged_user._id)
							? "Unfollow"
							: "Follow"}
					</span>
				</Button>
			);
		}
	};

	return (
		<>
			{isLoading ? (
				<>
					<CircularProgress
						sx={{ margin: "20vh auto", display: "flex" }}
						color={mode === "light" ? "secondary" : "primary"}
					/>
				</>
			) : (
				<>
					<Box sx={{ width: "90%", margin: "auto" }}>
						<Box
							sx={{
								width: "50%",
								margin: "2rem auto",
								"@media only screen and (max-width: 1100px)": {
									width: "90%",
								},
							}}
						>
							<Box
								display="flex"
								flexDirection="row"
								alignItems="center"
								margin="1rem auto"
								sx={{
									"@media only screen and (max-width: 530px)":
									{
										flexDirection: "column",
										justifyContent: "center",
									},
								}}
							>
								{suser.picture !== undefined ? (
									<img
										style={{
											borderRadius: "50%",
											width: "150px",
											height: '150px'
										}}
										id="profile-user-image"
										src={suser.picture.substring(8, 11) === "lh3" ? suser.picture : process.env.REACT_APP_API_URL + `/assets/${suser.picture}`}
										alt="USER"
									></img>
								) : (
									<img
										src="/img/user-default-logo.png"
										alt=""
										width="150px"
									></img>
								)}
								<Box
									margin="2rem 0 2rem 4rem"
									sx={{
										"@media only screen and (max-width: 530px)":
										{
											width: "90%",
											margin: "auto",
										},
									}}
								>
									<Typography sx={{ fontSize: "35px" }}>
										{user}
									</Typography>
									<Typography
										sx={{
											fontSize: "20px",
											marginTop: "1rem",
										}}
										color="#757575"
									>
										{logged_user === user
											? `${logged_user.username}`
											: `${suser.username}`}
									</Typography>
									<Typography
										sx={{
											fontSize: "15px",
											marginTop: "1rem",
										}}
										color="#757575"
									>
										{logged_user === user
											? `${logged_user.bio}`
											: `${suser.bio}`}
									</Typography>
								</Box>
							</Box>
							<Divider variant="middle" />
							<Box
								width="50%"
								p="2rem 0"
								margin="0 auto"
								display="flex"
								flexDirection="row"
								justifyContent="space-around"
								textAlign="center"
								sx={{
									"@media only screen and (max-width: 530px)":
									{
										width: "90%",
									},
								}}
							>
								<Box>
									<Typography
										color={
											mode === "light" ? "black" : "white"
										}
										fontSize="25px"
									>
										impressed{" "}
										<span style={{ fontWeight: "700" }}>
											{logged_user === user
												? `${logged_user.impressed.length}`
												: `${suser.impressed.length}`}
										</span>{" "}
										users
									</Typography>
								</Box>
							</Box>
							<Box
								width="100%"
								justifyContent="center"
								display="flex"
							>
								{follow_edit_btn()}
							</Box>
						</Box>
					</Box>
					<Divider variant="middle" />
					<Box width={"50%"} margin={"2rem auto"}>
						{blogs === undefined || blogs.length === 0 ? (
							<Typography margin={"7rem 0"} textAlign={"center"}>
								Couldn't Find any Blogs on this user's account
							</Typography>
						) : (
							<>
								{blogs.map((blog) => {
									return (
										<Blog
											title={blog.title}
											user={logged_user}
											content={blog.content}
											coverPath={blog.coverPath}
											impressed={blog.impressed.length}
											createdAt={blog.createdAt}
											key={blog._id}
											id={blog._id}
										/>
									);
								})}
							</>
						)}
					</Box>
				</>
			)}
		</>
	);
}
