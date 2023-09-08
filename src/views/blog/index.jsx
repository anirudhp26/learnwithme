import { Button, Card, CardContent, Typography, useTheme } from '@mui/material';

import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Blog(props) {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Card sx={{ margin: '1rem', backgroundColor: theme.palette.neutral.light, border: 'none', boxShadow: 'none' }}>
      <CardContent style={{ position: 'relative' }}>
        <div>
          <Typography fontSize={theme.typography.h2} margin={'1rem 0'} gutterBottom>
            {props.title}
          </Typography>
          <Typography fontSize={theme.typography.h4} textAlign={'center'} margin={'2rem 0'} color="textSecondary">
            <div dangerouslySetInnerHTML={{ __html: props.content.slice(0, 100) }}></div>
          </Typography>
          <Button onClick={() => navigate(`/blogs/${props.id}`)} color="primary">
            Read More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
