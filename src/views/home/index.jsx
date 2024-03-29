import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Blog from "../../components/BlogCards";
import FriendList from "../../components/FriendList";
import { Box, useTheme } from "@mui/material";

const Home = () => {
	const [friends, setFriends] = useState([]);
	const [isloading, setIsloading] = useState(true);
	const [pFeed, setPFeed] = useState([]);
	const [trendingFeed, settrendingFeed] = useState([]);
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
				`${process.env.REACT_APP_API_URL}/blog/getTrending`,
				{ id: user._id },
				{ headers: { Authorization: `Bearer ${isLoggedin}` } }
			)
			.then((recommendations) => {
				settrendingFeed(recommendations.data.blogs);
				setFriends(recommendations.data.friends);
				setIsloading(false);
			})
			.catch((error) => {
				console.log(error);
				setIsloading(false);
			});
	}, [user, isLoggedin]);
	useEffect(() => {
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/blog/getPersonalized`,
				{ id: user._id },
				{ headers: { Authorization: `Bearer ${isLoggedin}` } }
			)
			.then((recommendations) => {
				setPFeed(recommendations.data.blogs);
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
					<div className="loader-container">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</>
			) : (
				<>
					<Box
						textAlign={"center"}
						padding={"1rem"}
						backgroundColor={theme.palette.contrast.default}
						color={theme.palette.neutral.light}
						fontSize={theme.typography.h5}
					>
						{quote.content} <br></br>
						<i>
							~{" "}
							<span style={{ color: "goldenrod" }}>
								{quote.author}
							</span>
						</i>
					</Box>
					<Box
						display={"flex"}
						width={"100%"}
						justifyContent={"center"}
					>
						<Box
							width={"50%"}
							margin={"0 1rem 1rem 1rem"}
							padding={'1rem'}
							borderRight={`1px solid ${theme.palette.neutral.light}`}
							sx={{
								"@media only screen and (max-width: 1250px)": {
									width: "95%",
								},
							}}
						>
							{/* <Box
								display={"flex"}
								width={"100%"}
								borderTop={`1px solid ${theme.palette.neutral.light}`}
								borderRight={`1px solid ${theme.palette.neutral.light}`}
								borderLeft={`1px solid ${theme.palette.neutral.light}`}
								margin={"2rem auto"}
								padding={"1rem"}
							>
								<Box
									display={"flex"}
									justifyContent={"center"}
									borderRight={`1px solid ${theme.palette.neutral.light}`}
									alignItems={"center"}
									width={"50%"}
									sx={{ cursor: "pointer" }}
									onClick={() => {
										setPersonalizedfeed(true);
									}}
									padding={"1rem 0"}
									bgcolor={personalizedfeed ? theme.palette.contrast.default : "transparent"}
								>
									<Typography
										fontSize={theme.typography.h4}
										textAlign={"center"}
										fontWeight={"600"}
										color={theme.palette.neutral.medium}
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
									onClick={() => {
										setPersonalizedfeed(false);
									}}
									padding={"1rem 0"}
									bgcolor={!personalizedfeed ? theme.palette.contrast.default : "transparent"}

								>
									<Typography
										fontSize={theme.typography.h4}
										textAlign={"center"}
										fontWeight={"600"}
										color={theme.palette.neutral.medium}
									>
										Trending
									</Typography>
								</Box>
							</Box> */}
							{/* {personalizedfeed ? (
								<>
								</>
							) : (
								<>
								</>
							)} */}
							{pFeed.map((blog) => {
								return (
									<Blog
										title={blog.title}
										user={blog.user}
										content={blog.content}
										views={blog.views}
										coverPath={blog.coverPath}
										impressed={blog.impressed.length}
										createdAt={blog.createdAt}
										key={blog._id}
										id={blog._id}
									/>
								);
							})}
							{trendingFeed.map((blog) => {
								return (
									<Blog
										title={blog.title}
										user={blog.user}
										content={blog.content}
										views={blog.views}
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
