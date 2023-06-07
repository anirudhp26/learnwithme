import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import Axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';


export default function Explore() {
    const [users, setUsers] = React.useState([]);
    const navigate = useNavigate();
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
                    variant="outlined"
                    onChange={(e) => {
                        setTimeout(() => {
                            handleSearch(e.target.value);
                        }, 1000);
                    }}
                />

                <Box width={'100%'} display='flex' flexWrap='wrap'>
                    {users.map((user) => {
                        return(
                            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} minWidth={'200px'} width={'27%'} bgcolor={'black'} margin={'2rem auto'} borderRadius={'30px'} sx={{
                                transition: 'all 0.5s',
                                '&:hover': {
                                    padding: '1rem'
                                }
                            }} key={user._id}>
                                <img src='/img/user-default-logo.png' style={{ margin: '2rem 0 1rem 0'}} alt='' width='40%'></img>
                                <Typography color={'white'} fontSize={'35px'} marginBottom={'1rem'} onClick={() => {navigate(`/profile/${user.username}`)}}>{user.username}</Typography>
                                <Typography color={'grey'} fontSize={'20px'} marginBottom={'1rem'}>{user.name}</Typography>
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        </>
    )
}
