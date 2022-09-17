import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import Aos from "aos"
import "aos/dist/aos.css"

import DeleteIcon from '@mui/icons-material/Delete';

export default function CriticalMedicineCard({med,deleteMedicine}) {
  React.useEffect(()=>{
Aos.init({duration:2000})
  },[])
  return (
    <Box sx={{ minWidth: 100 }}>
      <Card variant="outlined" data-aos="fade-up">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {med}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton size="small" onClick={(e)=>{
          deleteMedicine(med)
        }}><DeleteIcon color="secondary"/></IconButton>
       
      </CardActions>
      </Card>
    </Box>
  );
}
