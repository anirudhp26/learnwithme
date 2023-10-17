import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';

export default function VerifyPhoneorEmail() {
    const [otp, setOTP] = useState(['', '', '', '']); // Initialize with 4 empty strings
    const [otpsent, setOtpsent] = useState(false);
    const handleInputChange = (e, index) => {
        const { value } = e.target;
        const newOTP = [...otp];
        newOTP[index] = value;
        setOTP(newOTP);
    };
    const theme = useTheme();
    // const otpRefs = Array.from({ length: 4 }, () => React.createRef());
    return (
        <>
            <Box bgcolor={theme.palette.primary.dark} display={otpsent ? "none" : "flex"} height={'100vh'} width={'100vw'} margin={'0 auto'} >
                <Box
                    width="30%"
                    height={"max-content"}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    margin={'auto'}
                    minWidth="320px"
                    bgcolor={theme.palette.background.alt}
                >
                    <Typography
                        letterSpacing="2px"
                        sx={{
                            margin: "2rem 0 0 0",
                        }}
                        paragraph
                        fontSize={theme.typography.h3}
                    >
                        Verify your Email
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
                            label="email"
                            color="secondary"
                            variant="outlined"
                            sx={{ margin: "1rem 0" }}
                        />
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
                                setOtpsent(true);
                            }}
                        >
                            <i
                                style={{ margin: "0 10px" }}
                                id="login-loading"
                                className="fa-solid fa-spinner fa-spin disable"
                            ></i>
                            <span>Send OTP</span>
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box bgcolor={theme.palette.primary.dark} display={otpsent ? "flex" : "none"} height={'100vh'} width={'100vw'} margin={'0 auto'} >
                <Box
                    width="30%"
                    height={"max-content"}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    margin={'auto'}
                    minWidth="320px"
                    bgcolor={theme.palette.background.alt}
                >
                    <Typography
                        letterSpacing="2px"
                        sx={{
                            margin: "2rem 0 0 0",
                        }}
                        paragraph
                        fontSize={theme.typography.h3}
                    >
                        Verify your Email
                    </Typography>
                    <Typography margin={'1rem auto'}>Enter the otp sent to the email you mentioned</Typography>
                    <Box
                        display="flex"
                        margin="1rem 0"
                        justifyContent="space-between"
                        width="80%"
                    >
                        {otp.map((digit, index) => (
                            <TextField
                                key={index}
                                variant="outlined"
                                margin="auto"
                                inputProps={{
                                    maxLength: 1,
                                    inputMode: 'numeric',
                                    style: { textAlign: 'center' }
                                }}
                                sx={{
                                    width: '50px',
                                    height: '50px',
                                    margin: '0 1rem',
                                    textAlign: 'center'
                                }}
                                value={digit}
                                onChange={(e) => handleInputChange(e, index)}
                            />
                        ))}
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
                                setOtpsent(true);
                            }}
                        >
                            <i
                                style={{ margin: "0 10px" }}
                                id="login-loading"
                                className="fa-solid fa-spinner fa-spin disable"
                            ></i>
                            <span>Verify OTP</span>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
