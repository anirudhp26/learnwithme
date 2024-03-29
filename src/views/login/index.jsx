import React, { useState } from "react";
import {
	Alert,
	Box,
	Button,
	Snackbar,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { EditOutlined } from "@mui/icons-material";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../../Firebase";
export default function Login() {
	const [isLogin, setisLogin] = useState(true);
	const [open, setOpen] = useState(false);
	const [error, setError] = useState("");
	const [password, setPassword] = useState("");
	const [cpassword, setcPassword] = useState("");
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [bio, setBio] = useState("");
	const [isClicked, setisClicked] = useState(false);
	const [image, setImage] = useState("");
	const [pfpPreview, setPfpPreview] = useState(null);
	const handleClose = () => {
		setOpen(false);
	};

	const theme = useTheme();
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = React.useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	const navigate = useNavigate();
	const googleLogin = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			const userInfo = await Axios.get(
				"https://www.googleapis.com/oauth2/v3/userinfo",
				{
					headers: {
						Authorization: `Bearer ${tokenResponse.access_token}`,
					},
				}
			);

			const isGoogleUserRegistered = await Axios.post(
				`${process.env.REACT_APP_API_URL}/auth/login`,
				{
					googleId: userInfo.data.sub,
					googlelogin: true,
				}
			);
			if (isGoogleUserRegistered.status === 200) {
				setisClicked(false);
				dispatch(
					setLogin({
						user: isGoogleUserRegistered.data.user,
						token: isGoogleUserRegistered.data.token,
					})
				);
				navigate("/");
			} else {
				dispatch(
					setLogin({
						user: userInfo.data,
						token: isGoogleUserRegistered.data.token,
					})
				);
				navigate("/editprofile");
			}
		},
		onError: (errorResponse) => console.log(errorResponse),
	});

	const handleloginSubmit = () => {
		Axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
			username: username,
			password: password,
			googlelogin: false,
		})
			.then(async (responce) => {
				document
					.getElementById("login-loading")
					.classList.toggle("disable");
				if (responce.data.loginStatus) {
					setisClicked(false);
					dispatch(
						setLogin({
							user: responce.data.user,
							token: responce.data.token,
						})
					);
					navigate("/");
				} else {
					setisClicked(false);
					setError(responce.data.message);
					setOpen(!open);
				}
			})
			.catch((error) => {
				document
					.getElementById("login-loading")
					.classList.toggle("disable");
				setError(error.message);
				setOpen(!open);
				setisClicked(false);
			});
	};

	const handlesignupSubmit = () => {
		const profileRef = ref(
			storage,
			`profile/${"p" + username + Date.now()}`
		);
		uploadBytes(profileRef, image)
			.then(async (snapshot) => {
				const imgLinkRef = ref(
					storage,
					`${snapshot.metadata.fullPath}`
				);
				getDownloadURL(imgLinkRef).then(async (downloadURL) => {
					await Axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, {
						username: username,
						password: password,
						name: name,
						bio: bio,
						picturePath: downloadURL,
					})
						.then(async (responce) => {
							document
								.getElementById("signup-loading")
								.classList.toggle("disable");
							if (responce.data.loginStatus) {
								setisClicked(false);
								dispatch(
									setLogin({
										user: responce.data.user,
										token: responce.data.token,
									})
								);
								navigate("/");
							} else {
								setisClicked(false);
								setError(responce.data.message);
								setOpen(!open);
							}
						})
						.catch((error) => {
							setisClicked(false);
							setError(error.message);
							setOpen(!open);
							document
								.getElementById("signup-loading")
								.classList.toggle("disable");
						});
				}).catch((error) => {
					setisClicked(false);
					console.log(error);
					setError(error.message);
					setOpen(!open);
					document
						.getElementById("signup-loading")
						.classList.toggle("disable");
				});
			})
			.catch((error) => {
				setisClicked(false);
				console.log(error);
				setError(error.message);
				setOpen(!open);
				document
					.getElementById("signup-loading")
					.classList.toggle("disable");
			});
	};
	return (
		<div
			style={{
				display: "flex",
				backgroundColor: theme.palette.neutral.dark,
				width: "100%",
				height: "100vh",
				margin: 0,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity="error"
					sx={{ width: "100%" }}
				>
					{error}
				</Alert>
			</Snackbar>
			{isLogin ? (
				<>
					<Box
						width="30%"
						height={"max-content"}
						display="flex"
						flexDirection="column"
						alignItems="center"
						minWidth="320px"
						bgcolor={theme.palette.background.alt}
					>
						<Typography
							letterSpacing="2px"
							sx={{
								margin: "2rem 0 0 0",
							}}
							paragraph
							fontSize={theme.typography.h1}
						>
							Login
						</Typography>
						<Box
							display="flex"
							flexDirection="column"
							margin="2rem 0"
							justifyContent="space-between"
							width="80%"
						>
							<TextField
								id="standard-basic"
								label="username"
								color="secondary"
								variant="standard"
								sx={{ margin: "1rem 0" }}
								onChange={(e) => {
									setUsername(e.target.value);
								}}
							/>
							<FormControl
								variant="standard"
								sx={{ margin: "1rem 0" }}
							>
								<InputLabel
									color="secondary"
									htmlFor="standard-adornment-password"
								>
									Password
								</InputLabel>
								<Input
									id="standard-adornment-password"
									type={showPassword ? "text" : "password"}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={
													handleClickShowPassword
												}
												onMouseDown={
													handleMouseDownPassword
												}
											>
												{showPassword ? (
													<VisibilityOff />
												) : (
													<Visibility />
												)}
											</IconButton>
										</InputAdornment>
									}
									onChange={(e) => {
										setPassword(e.target.value);
									}}
									color="secondary"
								/>
							</FormControl>
						</Box>
						<Box
							width={"80%"}
							display={"flex"}
							justifyContent={"space-between"}
							sx={{
								margin: "1rem auto",
								"@media only screen and (max-width: 1450px)": {
									width: "70%",
									margin: "0 auto",
									flexDirection: "column",
								},
							}}
						>
							<Button
								variant="outlined"
								sx={{
									// width: '30%',
									backgroundColor: "white",
									margin: "auto",
									color: "black",
									fontFamily: "JetBrains Mono",
									"&:hover": {
										backgroundColor: "black",
										color: "white",
									},
									"@media only screen and (max-width: 1450px)":
										{
											width: "70%",
											margin: "1rem auto",
										},
									border: "1px solid grey",
									textTransform: "none",
								}}
								id="auth-btn-2"
								onClick={() => {
									setisClicked((prev) => !prev);
									handleloginSubmit();
									document
										.getElementById("login-loading")
										.classList.toggle("disable");
								}}
								disabled={isClicked}
							>
								<i
									style={{ margin: "0 10px" }}
									id="login-loading"
									className="fa-solid fa-spinner fa-spin disable"
								></i>
								<span>Login</span>
							</Button>
							<Button
								variant="outlined"
								id="auth-btn-1"
								sx={{
									// width: '40%',
									backgroundColor: "black",
									margin: "auto",
									color: "white",
									fontFamily: "JetBrains Mono",
									"&:hover": {
										backgroundColor: "white",
										color: "black",
										border: "1px solid black",
									},
									"@media only screen and (max-width: 1450px)":
										{
											width: "70%",
											margin: "1rem auto",
										},
									fontSize: "10px !important",
									border: "1px solid grey",
									textTransform: "none",
									fontWeight: "600",
								}}
								onClick={() => {
									setisClicked((prev) => !prev);
									document.getElementById(
										"auth-btn-1"
									).attributes.disabled = true;
									googleLogin();
								}}
							>
								Login with&nbsp;
								<span style={{ color: "#4286f5" }}>G</span>
								<span style={{ color: "#ea4235" }}>o</span>
								<span style={{ color: "#fabc05" }}>o</span>
								<span style={{ color: "#4286f5" }}>g</span>
								<span style={{ color: "#34a853" }}>l</span>
								<span style={{ color: "#ea4235" }}>e</span>
							</Button>
						</Box>
						<Button
							variant="primary"
							sx={{
								textTransform: "none",
								color: "grey",
								margin: "1rem 0",
								transition: "all 0.5s",
								"&:hover": {
									backgroundColor: "black",
									color: "white",
								},
							}}
							onClick={() => {
								setisLogin(!isLogin);
							}}
						>
							Don't have an Account ?
						</Button>
					</Box>
				</>
			) : (
				<>
					<Box
						width={"40%"}
						display={"flex"}
						bgcolor={theme.palette.neutral.light}
						justifyContent={"center"}
						flexDirection={"column"}
						sx={{
							"@media only screen and (max-width: 900px)": {
								width: "80%",
								margin: "auto",
							},
						}}
					>
						<Typography
							letterSpacing="2px"
							sx={{
								margin: "1rem 0 1rem 0",
							}}
							paragraph
							textAlign={"center"}
							fontSize={theme.typography.h1}
						>
							Sign Up
						</Typography>
						<Box
							display="flex"
							flexDirection="column"
							justifyContent="space-between"
							width="80%"
							margin={"auto"}
						>
							<Box
								display={"flex"}
								flexDirection={"row"}
								justifyContent={"space-between"}
								width={"100%"}
								margin={"auto"}
							>
								<Dropzone
									maxFiles={1}
									acceptedFiles={".jpg, .jpeg, .png"}
									multiple={false}
									onDrop={(acceptedFiles) => {
										setImage(acceptedFiles[0]);
										setPfpPreview(
											URL.createObjectURL(
												acceptedFiles[0]
											)
										);
									}}
								>
									{({ getRootProps, getInputProps }) => (
										<Box
											{...getRootProps()}
											border={`1px dashed ${theme.palette.neutral.dark}`}
											padding={"1rem"}
											sx={{
												width: "70%",
												"&:hover": {
													cursor: "pointer",
												},
											}}
										>
											<input {...getInputProps()}></input>
											{!image ? (
												<Typography
													color={
														theme.palette.neutral
															.dark
													}
												>
													Add Profile Picture Here
												</Typography>
											) : (
												<Box
													display={"flex"}
													flexDirection={"row"}
													alignItems={"center"}
													justifyContent={
														"space-between"
													}
												>
													<Typography
														color={
															theme.palette
																.neutral.dark
														}
													>
														{image.name}
													</Typography>
													<EditOutlined
														sx={{
															color: theme.palette
																.neutral.dark,
														}}
													/>
												</Box>
											)}
										</Box>
									)}
								</Dropzone>
								{pfpPreview ? (
									<img
										src={pfpPreview}
										width={"70px"}
										height={"70px"}
										style={{ borderRadius: "50%" }}
										alt="PFP"
									></img>
								) : (
									<img
										src="/img/user-default-logo.png"
										alt=""
										width={"70px"}
										height={"70px"}
									></img>
								)}
							</Box>
							<TextField
								id="standard-basic"
								label="username"
								color="secondary"
								variant="standard"
								sx={{ margin: "1rem 0" }}
								onChange={(e) => {
									setUsername(e.target.value);
								}}
							/>
							<TextField
								id="outlined-basic"
								label="describe yourself.."
								color="secondary"
								sx={{ margin: "1rem 0" }}
								variant="outlined"
								onChange={(e) => {
									setBio(e.target.value);
								}}
								multiline
								rows="3"
							/>
							<TextField
								id="standard-basic"
								label="full Name"
								color="secondary"
								sx={{ margin: "1rem 0" }}
								variant="standard"
								onChange={(e) => {
									setName(e.target.value);
								}}
							/>
							<FormControl
								variant="standard"
								sx={{ margin: "1rem 0" }}
							>
								<InputLabel
									color="secondary"
									htmlFor="standard-adornment-password-1"
								>
									Password
								</InputLabel>
								<Input
									id="standard-adornment-password-1"
									type={showPassword ? "text" : "password"}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={
													handleClickShowPassword
												}
												onMouseDown={
													handleMouseDownPassword
												}
											>
												{showPassword ? (
													<VisibilityOff />
												) : (
													<Visibility />
												)}
											</IconButton>
										</InputAdornment>
									}
									onChange={(e) => {
										setPassword(e.target.value);
									}}
									color="secondary"
								/>
							</FormControl>
							<FormControl
								variant="standard"
								sx={{ margin: "1rem 0" }}
							>
								<InputLabel
									color="secondary"
									htmlFor="standard-adornment-password"
								>
									Confirm Password
								</InputLabel>
								<Input
									id="standard-adornment-password"
									type={showPassword ? "text" : "password"}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={
													handleClickShowPassword
												}
												onMouseDown={
													handleMouseDownPassword
												}
											>
												{showPassword ? (
													<VisibilityOff />
												) : (
													<Visibility />
												)}
											</IconButton>
										</InputAdornment>
									}
									onChange={(e) => {
										setcPassword(e.target.value);
									}}
									color="secondary"
								/>
							</FormControl>
						</Box>
						<Button
							variant="outlined"
							id="auth-btn-1"
							sx={{
								textTransform: "none",
								margin: "1rem auto",
								backgroundColor: "white",
								boxShadow: "none",
								borderRadius: "0",
								color: "black",
								width: "40%",
								"&:hover": {
									backgroundColor: "black",
									color: "white",
								},
								borderColor: "black",
							}}
							onClick={() => {
								if (password !== cpassword) {
									setError("Passwords dosen't match");
									setOpen(!open);
								} else {
									setisClicked((prev) => !prev);
									handlesignupSubmit();
									document
										.getElementById("signup-loading")
										.classList.toggle("disable");
								}
							}}
							disabled={isClicked}
						>
							<i
								style={{ margin: "0 10px" }}
								id="signup-loading"
								className="fa-solid fa-spinner fa-spin disable"
							></i>
							<span>Sign Up</span>
						</Button>
						<Button
							variant="primary"
							sx={{
								textTransform: "none",
								color: "grey",
								margin: "1rem auto",
								width: "50%",
								"&:hover": {
									backgroundColor: "black",
									color: "white",
								},
							}}
							onClick={() => {
								setisLogin(!isLogin);
							}}
						>
							Already have an Account ?
						</Button>
					</Box>
				</>
			)}
		</div>
	);
}
