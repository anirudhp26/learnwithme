import { Box, Divider, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function FriendList(props) {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <Box width={'90%'} height={'fit-content'} margin={'0 auto'} border={`1px solid ${theme.palette.neutral.medium}`} p={'1rem'}>
            <Typography fontSize={theme.typography.h5}>You were impressed by ...</Typography>
            <Divider variant='middle' sx={{ margin: '1rem 0' }} />
            {props.friends.length === 0
                ?
                <>
                    <Typography>It's too lonely in here, add some trending writers to your list</Typography>
                </>
                :
                <>
                    {props.friends.map((friend) => {
                        return (
                            <Box width={'90%'} alignItems={'center'} padding={'1rem'} border={`1px solid transparent`} margin={'0 auto'} display={'flex'} sx={{
                                '&:hover': {
                                    border: `1px solid ${theme.palette.neutral.dark}`
                                }
                            }} onClick={() => { navigate(`/profile/${friend.username}`); }}>
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
                </>}
        </Box>
    )
}
