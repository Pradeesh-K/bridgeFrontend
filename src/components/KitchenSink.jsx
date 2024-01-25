import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useState,useEffect } from 'react';
import axios from "axios";
const backendURL = import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:5555';

export default function KitchenSink({bridge}) {
    // console.log(bridge);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisLiked] = useState(false);

    useEffect(() => {

    }, [bridge]);

    const handleLikeDislike = async (actionType, state, setState, logMessage, otherActionType, otherState, otherSetState, otherLogMessage,) => {
      try {
        // Check if the user has already performed the action
        if (!state && !otherState) {
          // Make a PUT request to update the bridge with the new information
          const updatedBridge = await axios.put(`${backendURL}/bridges/${id}`, {
          
            [actionType]: bridge[actionType] + 1,
          });
    
          // Update the component state and log the message
          setState(true);
          console.log(logMessage, updatedBridge.data);
        } else if (state && !otherState) {
          console.log(`Already ${actionType.toLowerCase()}ed!`);
          // User has already performed the action, so remove it
        const updatedBridge = await axios.put(`${backendURL}/bridges/${id}`, {
        [actionType]: bridge[actionType] - 1,
          });
      // Update the component state and log the message
      setState(false);
      console.log(`Removed ${actionType.toLowerCase()}!`, updatedBridge.data);
        }

        else if (!state && otherState) {
          
          
        const updatedBridge = await axios.put(`${backendURL}/bridges/${id}`, {
        [actionType]: bridge[actionType] +1,
        [otherActionType]: bridge[otherActionType] -1,
          });
          setState(true);
      // Update the component state and log the message
      otherSetState(false);
      console.log(`${logMessage}, Removed ${otherActionType}.toLowerCase()}!`, updatedBridge.data);
        }
      } catch (error) {
        console.error(`Error ${actionType.toLowerCase()}ing the bridge:`, error);
      }
    };
    

    const handleLike = async () => {
      handleLikeDislike('likes', liked, setLiked, 'Liked!', 'dislikes', disliked, setDisLiked, 'Disliked!');
    };

    const handleDislike = async () => {
      handleLikeDislike('dislikes', disliked, setDisLiked, 'Disliked!','likes', liked, setLiked, 'Liked!');  
    };

  return (
    <Card style={{ width: '36rem' }}>
      <Card.Img variant="top" src={bridge.images && bridge.images[0]}  style={{ width: '100%', height: '25rem' }}/>
      <Card.Body>
        <div className='d-flex'>
          <Button variant={liked ?"success": "outline-success"} style={{ width: '50%' }} onClick={handleLike} >  {liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}</Button>
          <Button variant={disliked ?"danger": "outline-danger"} style={{ width: '50%' }}  onClick={handleDislike} >{disliked ? <ThumbDownIcon/> :<ThumbDownOffAltOutlinedIcon /> }</Button>
        </div>
        <Card.Title>{bridge.name}</Card.Title>
        <Card.Text className='text-secondary'>     
        {bridge.description}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
      <ListGroup.Item><b>Proposed Duration:</b> {bridge.durationMonths} months</ListGroup.Item>
        <ListGroup.Item><b>Proposed Budget:</b> {bridge.cost} Million &euro;</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}
