import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { styled, useTheme } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Divider, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout, setMode } from "../../redux";

const pages = ["Home", "Explore", "Pricing", "Blog"];

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
	width: 62,
	height: 34,
	padding: 7,
	"& .MuiSwitch-switchBase": {
		margin: 1,
		padding: 0,
		transform: "translateX(6px)",
		"&.Mui-checked": {
			color: "#fff",
			transform: "translateX(22px)",
			"& .MuiSwitch-thumb:before": {
				backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
					"#fff"
				)}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
			},
			"& + .MuiSwitch-track": {
				opacity: 1,
				backgroundColor:
					theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
			},
		},
	},
	"& .MuiSwitch-thumb": {
		backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
		width: 32,
		height: 32,
		"&:before": {
			content: "''",
			position: "absolute",
			width: "100%",
			height: "100%",
			left: 0,
			top: 0,
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center",
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
				"#fff"
			)}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
		},
	},
	"& .MuiSwitch-track": {
		opacity: 1,
		backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
		borderRadius: 20 / 2,
	},
}));

function Navbar() {
	const theme = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const token = useSelector((state) => state.token);
	React.useEffect(() => {
		if (token === null) {
			navigate("/");
		}
	});
	const user = useSelector((state) => state.user);
	const mode = useSelector((state) => state.mode);
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	return (
		<AppBar
			position="static"
			sx={{ boxShadow: "none", margin: "auto", backgroundColor: theme.palette.neutral.light }}
		>
			<Container maxWidth="xl">
				<Toolbar
					disableGutters
					sx={{
						display: "flex",
						justifyContent: "space-around",
						height: { xs: "9vh", md: "12vh" },
						alignItems: "center",
						width: { xs: "100%", md: "90%" },
						margin: "auto",
					}}
				>
					<Box
						sx={{
							display: { xs: "none", md: "flex" },
							justifyContent: "center",
							width: "10%",
						}}
					>
						<img
							src="../img/logo_transparent.png"
							alt="LOGO"
							width={"80px"}
						></img>
					</Box>
					<Box
						sx={{
							display: { xs: "flex", md: "none" },
							width: "20%",
						}}
					>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color={theme.palette.neutral.dark}
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map((page) => (
								<MenuItem
									key={page}
									onClick={handleCloseNavMenu}
								>
									<Typography textAlign="center">
										<Link
											underline="none"
											sx={{ cursor: "pointer", color: theme.palette.neutral.dark }}
											onClick={() => {
												navigate(
													`/${page.toLowerCase()}`
												);
											}}
										>
											{page}
										</Link>
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Box
						display={{ xs: "flex", md: "none" }}
						justifyContent={"center"}
						width={"60%"}
						margin={"auto"}
					>
						<img
							src="../img/logo_transparent.png"
							alt="LOGO"
							width={"50px "}
						></img>
					</Box>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
							justifyContent: "center",
						}}
					>
						{pages.map((page) => (
							<Typography
								onClick={() => {
									navigate(`/${page.toLowerCase()}`);
								}}
								key={page}
								fontSize={"17px"}
								fontWeight={"500"}
								p={"0 2rem"}
								sx={{
									color: theme.palette.neutral.dark,
									cursor: "pointer",
								}}
							>
								{page}
							</Typography>
						))}
					</Box>
					{user === null ? (
						<></>
					) : (
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Tooltip title="Open settings">
								<IconButton
									onClick={handleOpenUserMenu}
									sx={{ p: 1, borderRadius: '0' }}
								>
									{user.picture !== undefined ? (
										<img
											style={{
												borderRadius: "50%",
												width: "50%",
											}}
											src={user.picture}
											alt="USER"
										>
										</img>
									) : (
										<img src='/img/user-default-logo.png' alt='' width={'40px'}></img>
									)}
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								<Typography
									width={"90%"}
									margin={"auto"}
									p="1rem"
									fontSize={theme.typography.h5}
									color={theme.palette.neutral.dark}
									sx={{
										cursor: "pointer",
									}}
									textAlign={"center"}
									onClick={() => {
										navigate(`/profile/${user.username}`);
									}}
								>
									{user.username}
								</Typography>
								<Divider
									variant="middle"
								></Divider>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										margin: "10px 0 10px 25px",
									}}
								>
									<FormGroup>
										<FormControlLabel
											control={
												<MaterialUISwitch
													sx={{ width: "60px" }}
													defaultChecked={
														mode === "light"
															? false
															: true
													}
												/>
											}
											label=""
											onClick={() => {
												dispatch(setMode());
											}}
										/>
									</FormGroup>
								</Box>
								<Divider
									variant="middle"
								></Divider>
								<Button
									fullWidth
									variant="danger"
									onClick={() => {
										dispatch(setLogout());
										navigate("/");
									}}
								>
									<Typography
										padding={'0.5rem'}
										textTransform="none"
										color="red"
										fontSize={theme.typography.h5}
									>
										Logout
									</Typography>
								</Button>
							</Menu>
						</Box>
					)}
				</Toolbar>
			</Container>
			<Divider
				variant="middle"
			></Divider>
		</AppBar>
	);
}
export default Navbar;
