import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Blog from "../blog";
import FriendList from "../../components/FriendList";
import { Box, Typography, useTheme } from "@mui/material";

const Home = () => {
	const [feed, setFeed] = useState([]);
	const [friends, setFriends] = useState([]);
	const [isloading, setIsloading] = useState(true);
	const [personalizedfeed, setPersonalizedfeed] = useState(true);
	const [quote, setQuote] = useState({});
	const isLoggedin = useSelector((state) => state.token);
	const user = useSelector((state) => state.user);
	const theme = useTheme();
	useEffect(() => {
		const getQuote = async () => {
			const quote = await axios.get("https://api.quotable.io/random");
			console.log(quote);
			setQuote(quote.data);
		};
		getQuote();
	}, []);
	useEffect(() => {
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/blog/getRecommendations`,
				{ id: user._id },
				{ headers: { Authorization: `Bearer ${isLoggedin}` } }
			)
			.then((recommendations) => {
				setFeed(recommendations.data.blogs);
				setFriends(recommendations.data.friends);
				console.log(recommendations.data.blogs);
				setIsloading(false);
			})
			.catch((error) => {
				console.log(error);
				setIsloading(false);
			});
	}, [user, isLoggedin]);
	return (
		<>
			{isloading ? (
				<>
					<div class="loader-container">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</>
			) : (
				<>
					<Typography
						textAlign={"center"}
						margin={"2rem 0"}
						fontSize={theme.typography.h4}
					>
						{quote.content} <br></br>
						<i>
							~{" "}
							<span style={{ color: "goldenrod" }}>
								{quote.author}
							</span>
						</i>
					</Typography>
					<Box
						display={"flex"}
						width={"100%"}
						justifyContent={"center"}
					>
						<Box
							width={"50%"}
							margin={"0 1rem 1rem 1rem"}
							sx={{
								"@media only screen and (max-width: 1250px)": {
									width: "95%",
								},
							}}
						>
							<Box
								display={"flex"}
								width={"100%"}
								margin={"2rem auto"}
								borderTop={`1px solid ${theme.palette.neutral.dark}`}
								padding={"1rem"}
								borderRadius={"15px"}
							>
								<Box
									display={"flex"}
									justifyContent={"center"}
									borderRight={`1px solid ${theme.palette.neutral.dark}`}
									alignItems={"center"}
									width={"50%"}
									sx={{ cursor: "pointer" }}
									borderBottom={
										personalizedfeed
											? `4px solid ${theme.palette.primary.main}`
											: "none"
									}
									onClick={() => {
										setPersonalizedfeed(true);
									}}
									padding={"1rem 0"}
								>
									<Typography
										fontSize={theme.typography.h4}
										textAlign={"center"}
										fontWeight={"600"}
										color={theme.palette.primary.dark}
									>
										Personalized
									</Typography>
								</Box>
								<Box
									display={"flex"}
									justifyContent={"center"}
									alignItems={"center"}
									width={"50%"}
									sx={{ cursor: "pointer" }}
									borderBottom={
										personalizedfeed
											? "none"
											: `4px solid ${theme.palette.primary.main}`
									}
									onClick={() => {
										setPersonalizedfeed(false);
									}}
									padding={"1rem 0"}
								>
									<Typography
										fontSize={theme.typography.h4}
										textAlign={"center"}
										fontWeight={"600"}
										color={theme.palette.primary.dark}
									>
										Trending
									</Typography>
								</Box>
							</Box>
							{feed.map((blog) => {
								return (
									<Blog
										title={blog.title}
										user={blog.user}
										content={blog.content}
										coverPath={blog.coverPath}
										impressed={blog.impressed.length}
										createdAt={blog.createdAt}
										key={blog._id}
										id={blog._id}
									/>
								);
							})}
						</Box>
						<Box
							display={"flex"}
							width={"20%"}
							margin={"1rem 0"}
							sx={{
								"@media only screen and (max-width: 1250px)": {
									display: "none",
								},
							}}
						>
							<FriendList friends={friends} />
						</Box>
					</Box>
				</>
			)}
		</>
	);
};

export default Home;
