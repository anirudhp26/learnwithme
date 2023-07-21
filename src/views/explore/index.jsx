import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import Axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function Explore() {
    const [users, setUsers] = React.useState([]);
    const navigate = useNavigate();
    const mode = useSelector((state) => state.mode);
    const userSearch = (value) => {
        Axios.post(`${process.env.REACT_APP_API_URL}/auth/getUsers`, {
            keyword: value,
        })
            .then((responce) => {
                console.log(responce.data);
                setUsers(responce.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleSearch = (value) => {
        userSearch(value);
    };
    return (
        <>
            <Box width='90%' margin='2rem auto'>
                <TextField
                    fullWidth
                    id="input-with-icon-textfield"
                    label="Search for Users"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SentimentVerySatisfiedIcon />
                            </InputAdornment>
                        ),
                    }}
                    color={mode === 'light' ? 'secondary' : 'primary'}
                    variant="outlined"
                    onChange={(e) => {
                        setTimeout(() => {
                            handleSearch(e.target.value);
                        }, 1000);
                    }}
                />

                <Box width={'100%'} margin={'2rem 0'} display='flex' flexDirection='column'>
                    {users.map((user) => {
                        return (
                            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'} width={'70%'} bgcolor={mode === 'light' ? 'white' : 'black'} border={mode === 'light' ? '1px solid black' : 'none'} padding={'1rem'} margin={'2rem auto'} sx={{
                                transition: 'all 0.5s',
                                '&:hover': {
                                    padding: '1.5rem'
                                },
                                '@media only screen and (max-width: 700px)': {
                                    width: '80%',
                                    margin: '1rem auto'
                                }
                            }} key={user._id} onClick={() => { navigate(`/profile/${user.username}`) }}>
                                <Box width={'30%'} display={'flex'} justifyContent={'center'} sx={{
                                        '@media only screen and (max-width: 700px)': {
                                            width: '50%'
                                        }
                                    }}>
                                    <img src='/img/user-default-logo.png' alt='' width='30%'></img>
                                </Box>
                                <Typography color={mode === 'light' ? 'secondary' : 'primary'} width='35%' display='flex' justifyContent='center'>{user.username}</Typography>
                                <Typography sx={{
                                    '@media only screen and (max-width: 700px)': {
                                        display: 'none'
                                    }
                                }} color={'grey'} width='35%' display='flex' justifyContent='center'>{user.name}</Typography>
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        </>
    )
}
