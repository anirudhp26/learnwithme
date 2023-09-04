import {
	Alert,
	Box,
	Button,
	Divider,
	Snackbar,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";
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
	const [isvalid, setIsvalid] = useState(true);
	const [open, setOpen] = useState(false);
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const theme = useTheme();

	const handleClose = () => {
		setOpen(false);
	};
	axios.defaults.withCredentials = true;

	const checkUsernameAvailability = async (value) => {
		if (user.username === undefined || user.username !== value) {
			axios
				.post(
					`${process.env.REACT_APP_API_URL}/auth/checkusernameavailable`,
					{ username: value },
					{ headers: { Authorization: `Bearer ${token}` } }
				)
				.then((responce) => {
					if (responce.status === 201) {
						setIsvalid(responce.data.username_available);
						setError("username already used");
						setOpen((prev) => !prev);
						setisClicked(true);
					} else {
						setisClicked(false);
						setIsvalid(responce.data.username_available);
					}
				});
		}
	};

	const handleEditProfileSubmit = async () => {
		if (isvalid) {
			axios
				.post(
					`${process.env.REACT_APP_API_URL}/auth/updateUser`,
					{
						user: editedUser,
						googleUserUpdate:
							user.username === undefined ? true : false,
					},
					{ headers: { Authorization: `Bearer ${token}` } }
				)
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
						navigate(
							`/profile/${responce.data.updatedUser.username}`
						);
					} else {
						setError(responce.data.message);
						setisClicked((prev) => !prev);
						document
							.getElementById("edit-loading")
							.classList.toggle("disable");
						setOpen((prev) => !prev);
					}
				});
		} else {
			setError("Invalid data fields");
			setOpen((prev) => !prev);
			setisClicked((prev) => !prev);
			document.getElementById("edit-loading").classList.toggle("disable");
		}
	};

	const handleInputChange = (e) => {
		setIsvalid(true);
		const { name, value } = e.target;
		setEditeduser((prevData) => ({ ...prevData, [name]: value }));
	};

	return (
		<div>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity="error"
					sx={{ width: "100%" }}
				>
					{error}
				</Alert>
			</Snackbar>
			<Box
				width={{ xs: "70%", md: "90%" }}
				margin={"2rem auto"}
				borderRadius={"15px"}
			>
				<Box
					width={"20%"}
					margin={"2rem auto"}
					padding={"2rem"}
					display={"flex"}
					justifyContent={"center"}
				>
					{user?.picture ? (
						<img
							style={{
								borderRadius: "50%",
								width: "150px",
								height: '150px'
							}}
							id="edit-user-image"
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
							width="150px"
						></img>
					)}
				</Box>
				<Box width={{ xs: "90%", md: "50%" }} margin={"0 auto"}>
					<TextField
						error={
							username.indexOf(" ") >= 0 || !isvalid
								? true
								: false
						}
						name="username"
						color={mode === "light" ? "secondary" : "primary"}
						sx={{ margin: "1rem auto" }}
						defaultValue={
							user.username === undefined ? "" : user.username
						}
						fullWidth
						label="username"
						helperText={
							username.indexOf(" ") >= 0
								? "no spaces allowed"
								: ""
						}
						id="fullWidth"
						onChange={(e) => {
							checkUsernameAvailability(e.target.value);
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
