import { Box, Button, Card, CardContent, Typography, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Blog(props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const user = props.user;
  const calculateAgeOfBlog = (createdAt) => {
    const currentDate = new Date();
    const blogDate = new Date(createdAt);
    const timeDiff = currentDate - blogDate;
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return `${daysAgo} days ago`;
  };

  return (
    <Card sx={{ margin: '1rem', border: `1px solid ${theme.palette.neutral.medium}`, boxShadow: 'none', backgroundColor: 'transparent' }}>
      <CardContent style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} width={'100%'} sx={{
            // eslint-disable-next-line no-useless-concat
            backgroundImage: `url("` + `${process.env.REACT_APP_API_URL}/assets/` + props.coverPath + `")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}> 
            <Box display={'flex'} width={'max-content'} alignItems={'center'} sx={{
              transition: 'all 0.5s',
              border: `1px solid ${theme.palette.neutral.medium}`,
              backgroundColor: theme.palette.background.default,
              margin: '1rem',
              padding: '1rem',
              '&:hover': {
                border: `1px solid ${theme.palette.neutral.mediumMain}`,
              },
            }}>
              <Avatar alt={user.username} src={user.picture} style={{ marginRight: '1rem' }} />
              <Typography fontSize={theme.typography.h6} color="textPrimary">
                {user.username}
              </Typography>
            </Box>
          </Box>
        </div>
            <Typography fontSize={theme.typography.h2} margin={'1rem 0'} textAlign={'center'}>
              {props.title}
            </Typography>
        <div style={{
          fontSize: theme.typography.h4,
          textAlign: 'center',
          margin: '2rem 0',
          color: theme.palette.neutral.dark
        }} dangerouslySetInnerHTML={{ __html: (props.content.slice(0, 150) + "...") }}></div>
        <Button onClick={() => navigate(`/blogs/${props.id}`)} color="primary">
          Read More
        </Button>
        <Typography textAlign={'end'} fontSize={theme.typography.caption} color="textSecondary">
          {calculateAgeOfBlog(props.createdAt)} &bull; {props.impressed} Likes
        </Typography>
      </CardContent>
    </Card>
  );
}
