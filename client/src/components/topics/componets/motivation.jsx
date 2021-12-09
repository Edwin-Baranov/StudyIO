import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Motivational() {
  const [quote, setQuote] = useState('');

  useEffect (() => {
    axios.get('api/quote')
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err))
  })

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Quote of the Day
        </Typography>
        <Typography variant="h5" component="div">
          Quote from some person
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          some person
        </Typography>
      </CardContent>
    </Card>
  );
}