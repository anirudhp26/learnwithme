import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'

export default function FriendList(props) {
    const theme = useTheme();
    return (
        <Box width={'90%'} margin={'1rem auto'} border={`1px solid ${theme.palette.neutral.medium}`} p={'1rem'} borderRadius={'15px'}>
            <Typography fontSize={theme.typography.h5}>Friend List</Typography>
            {props.friends.map((friend) => {
                return (
                    <Box width={'90%'} alignItems={'center'} padding={'0.3rem'} margin={'1rem auto'} display={'flex'}>
                        {friend?.picture !== undefined ? (
                            <img
                                style={{
                                    borderRadius: "50%",
                                    width: "40px",
                                    height: "40px",
                                }}
                                id="profile-user-image"
                                src={friend.picture.substring(8, 11) === "lh3" ? friend.picture : process.env.REACT_APP_API_URL + `/assets/${friend.picture}`}
                                alt="USER"
                            ></img>
                        ) : (
                            <img
                                src="/img/user-default-logo.png"
                                alt=""
                                width="40px"
                            ></img>
                        )}
                        <Typography fontSize={theme.typography.h5} margin={'0 0.5rem'}>{friend.username}</Typography>
                    </Box>
                )
            })}
        </Box>
    )
}
