import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link} from "react-router-dom";

export default function BridgeCard({bridge}) {
  return (
    <Card key={bridge._id} sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="240"
        image={bridge.images[Math.floor(Math.random()*3)]}
      />
      <CardContent sx={{paddingBottom:0}}>
        <Typography gutterBottom variant="h6" component="div" sx={{marginBottom:0, textShadow:'none'}}>
          {bridge.name}
        </Typography>
        <Typography variant="body" component="div" sx={{marginBottom:0, textShadow:'none'}}>
          {bridge.architect}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
            {bridge.description}
        </Typography> */}
      </CardContent>
      <CardActions sx={{ alignItems:'center'}}>
      <Link to={`/bridges/details/${bridge._id}`} style={{ textDecoration: "none" }}>
        <Button size="small" >view details</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
