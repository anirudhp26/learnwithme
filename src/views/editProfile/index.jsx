import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function EditProfile() {
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);
  const handleEditProfileSubmit = async () => {
    
  }
  return (
    <div>
      <Box
        width={{ xs: "70%", md: "90%" }}
        margin={"2rem auto"}
        border={'1px solid black'}
        borderRadius={'15px'}
      >
        <Box width={'20%'} margin={'2rem auto'} padding={'2rem'} display={'flex'} justifyContent={'center'}>
          {user.picture === undefined ? (
            <i style={{ fontSize: '100px' }} className="fa-solid fa-user"></i>
          ) : (
            <img
              style={{
                borderRadius: "50%",
                width: "50%",
              }}
              src={user.picture}
              alt={
                <i className="fa-solid fa-user"></i>
              }
            >
            </img>
          )}
        </Box>
        <Box width={{ xs: '90%', md: '50%' }} margin={'0 auto'}>
          <TextField color={mode === "light" ? "secondary" : "primary"} sx={{ margin: '1rem auto' }} fullWidth label="username" id="fullWidth" />
          <TextField color={mode === "light" ? "secondary" : "primary"} sx={{ margin: '1rem auto' }} fullWidth label="name" defaultValue={user.name} id="fullWidth" />
          <TextField color={mode === "light" ? "secondary" : "primary"} sx={{ margin: '1rem auto' }} fullWidth label="email" defaultValue={user.email !== undefined ? user.email : ""} id="fullWidth" />
          <TextField color={mode === "light" ? "secondary" : "primary"} sx={{ margin: '1rem auto' }} fullWidth label="bio" id="fullWidth" multiline rows={'4'} />
        <Divider variant="middle"/>
          <Button
            variant="outlined"
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
          <Typography marginBottom={'2rem'} sx={{ color: 'grey', fontSize: '10px', fontFamily: 'JetBrains Mono', display: user.username === undefined ? "flex" : "none" }}>&#42; if you submit without entering a valid username, a random username will get generated. You can change it later here</Typography>
        </Box>
      </Box>
    </div>
  );
}