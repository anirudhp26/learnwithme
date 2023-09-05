import { Button, Card, CardContent, Typography, useTheme } from '@mui/material';

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Blog(props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ margin: '1rem'}}>
      <CardContent style={{ position: 'relative' }}>
        <div className={`glass-effect ${expanded ? 'expanded' : ''}`}>
          <Typography fontSize={theme.typography.h2} gutterBottom>
            {props.title}
          </Typography>
          <Typography fontSize={theme.typography.h4} color="textSecondary">
            <div dangerouslySetInnerHTML={{ __html: expanded ? props.content : props.content.slice(0, 100)}}></div>
          </Typography>
          {!expanded && (
            <Button onClick={toggleExpand} color="primary">
              Read More
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
