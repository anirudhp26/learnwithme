import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLogin } from "../../redux";
import { useNavigate } from "react-router-dom";
export default function EditProfile() {
	const [username, setUsername] = useState("");
	const user = useSelector((state) => state.user);
	const token = useSelector((state) => state.token);
	const mode = useSelector((state) => state.mode);
	const [editedUser, setEditeduser] = useState(user);
	const [isClicked, setisClicked] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleEditProfileSubmit = async () => {
		axios
			.post(`${process.env.REACT_APP_API_URL}/auth/updateUser`, {
				user: editedUser,
				googleUserUpdate: user.username === undefined ? true : false,
			})
			.then((responce) => {
				if (responce.status === 200) {
					dispatch(
						setLogin({
							user: responce.data.updatedUser,
							token: token,
						})
					);
					setisClicked((prev) => !prev);
					document
						.getElementById("edit-loading")
						.classList.toggle("disable");
					navigate(`/profile/${responce.data.updatedUser.username}`);
				} else {
					setisClicked((prev) => !prev);
				}
			});
	};
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditeduser((prevData) => ({ ...prevData, [name]: value }));
	};
	return (
		<div>
			<Box
				width={{ xs: "70%", md: "90%" }}
				margin={"2rem auto"}
				border={
					mode === "light" ? "1px solid black" : "1px solid white"
				}
				borderRadius={"15px"}
			>
				<Box
					width={"20%"}
					margin={"2rem auto"}
					padding={"2rem"}
					display={"flex"}
					justifyContent={"center"}
				>
					<img src={user.picture === undefined ? '/img/user-default-logo.png' : user.picture} alt='' width='100px' style={{ borderRadius: '50%' }}></img>
				</Box>
				<Box width={{ xs: "90%", md: "50%" }} margin={"0 auto"}>
					<TextField
						error={username.indexOf(" ") >= 0 ? true : false}
						name="username"
						color={mode === "light" ? "secondary" : "primary"}
						sx={{ margin: "1rem auto" }}
						defaultValue={
							user.username === undefined ? "" : user.username
						}
						fullWidth
						label="username"
						id="fullWidth"
						onChange={(e) => {
							handleInputChange(e);
							setUsername(e.target.value);
						}}
					/>
					<TextField
						name="name"
						color={mode === "light" ? "secondary" : "primary"}
						sx={{ margin: "1rem auto" }}
						fullWidth
						label="name"
						defaultValue={user.name}
						id="fullWidth"
						onChange={handleInputChange}
					/>
					<TextField
						name="email"
						color={mode === "light" ? "secondary" : "primary"}
						sx={{ margin: "1rem auto" }}
						fullWidth
						label="email"
						defaultValue={
							user.email !== undefined ? user.email : ""
						}
						id="fullWidth"
						onChange={handleInputChange}
					/>
					<TextField
						name="bio"
						color={mode === "light" ? "secondary" : "primary"}
						sx={{ margin: "1rem auto" }}
						fullWidth
						label="bio"
						id="fullWidth"
						multiline
						rows={"4"}
						defaultValue={user.bio === undefined ? "" : user.bio}
						onChange={handleInputChange}
					/>
					<Divider variant="middle" />
					<Button
						variant="outlined"
						disabled={isClicked}
						sx={{
							backgroundColor: "white",
							margin: "1rem auto",
							color: "black",
							fontFamily: "JetBrains Mono",
							"&:hover": {
								backgroundColor: "black",
								color: "white",
							},
							border: "1px solid grey",
							textTransform: "none",
						}}
						id="auth-btn-2"
						onClick={() => {
							setisClicked((prev) => !prev);
							handleEditProfileSubmit();
							document
								.getElementById("edit-loading")
								.classList.toggle("disable");
						}}
					>
						<i
							style={{ margin: "0 10px" }}
							id="edit-loading"
							className="fa-solid fa-spinner fa-spin disable"
						></i>
						<span>Submit</span>
					</Button>
					<Typography
						marginBottom={"2rem"}
						sx={{
							color: "grey",
							fontSize: "10px",
							fontFamily: "JetBrains Mono",
							display:
								user.username === undefined ? "flex" : "none",
						}}
					>
						&#42; if you submit without entering a valid username, a
						random username will get generated. You can change it
						later here
					</Typography>
				</Box>
			</Box>
		</div>
	);
}
