import React, {useState, useEffect} from 'react';
import {Avatar, Button, Stack} from '@mui/material';
import axios from 'axios';

import {Box, Grid, List, ListItem, ListItemText, ListItemAvatar, ListItemIcon} from '@mui/material'



const RoomsList = ({ topicId, name }) => {
    // future: set random thumbnails for room if user do not upload one **
    // const roomData = [
    //     { id: 1, name: 'math', thumbnail: "https://www.suicideinfo.ca/wp-content/uploads/2016/07/Small-Talk-Logo.png" },
    //     { id: 2, name: 'science', thumbnail: "https://www.pinclipart.com/picdir/middle/167-1677865_facebook-button-image-facebook-small-icon-png-clipart.png" },
    //     { id: 3, name: 'english', thumbnail: "https://www.vhv.rs/dpng/d/497-4977652_facebook-icon-small-twitter-icon-small-logo-twitter.png" }
    // ]
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        if (topicId) {
            axios.get(`/api/rooms/topic/${topicId}/rooms`)
                .then(result => {
                    setRooms(result.data)
                })
                .catch(err => console.log(err))
        } else {
            axios.get(`/api/rooms/name/:${name}`)
                .then(result => {
                    setRooms(result.data)
                })
                .catch(err => console.log(err))
        }
    }, [])

    let handleJoin = (e) => {
        // TODO
    }

    useEffect(() => {
       if (topicId) {
          axios.get(`/api/rooms/topic/${topicId}`)
            .then(result => {
                setRooms(result.data)
            })
            .catch(err => console.log(err))
       } else {
           axios.get(`/api/rooms/name/${name}`)
            .then(result => {
                setRooms(result.data)
            })
            .catch(err => console.log(err))
       }
    }, [])
    
    if (rooms.length) {
        return (
            // <div className="RoomsList" >
            //     {rooms.map(room => (
            //         <Stack key={room.id} sx={style} direction="row" spacing={5}>
            //             <div>Room {room.id} {room.name}</div>
            //             {room.thumbnail ? <Avatar src={room.thumbnail} style={imageStyle} /> : <div></div>}
            //             <div>
            //                 <Button
            //                     size="small"
            //                     variant="outlined"
            //                     key={room.id}
            //                     onClick={()=>{window.location.href = window.location.origin + `/chatroom?room=${room.id}`}}
            //                 >
            //                     Join
            //                 </Button>
            //             </div>
            //         </Stack>
            //     ))}
            // </div>
            <Box>
                <Grid item >
                    <List>
                        {rooms.map(room => (
                            <ListItem sx={style} key={room.id} >
                                <ListItemAvatar >
                                    {room.thumbnail ? <Avatar src={room.thumbnail} style={imageStyle} />
                                    : <Avatar style={imageStyle} alt='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'/>}
                                </ListItemAvatar >
                                <ListItemText>
                                    Room {room.id} {room.name}
                                </ListItemText>
                                <Button
                                    sx={{ marginLeft: "10px" }}
                                    size="small"
                                    variant="outlined"
                                    key={room.id}
                                    onClick={()=>{window.location.href = window.location.origin + `/chatroom?room=${room.id}`}}
                                >
                                    Join
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Box>
        )
    } else {
        return (
            <div>
                No Rooms Available
            </div>
        )
    }
}

export default RoomsList;

const style = {
    alignItems: "center",
    justifyContent: "space-between"
}

const imageStyle = {
    margin: "5px",
    width: "50px",
    height: "50px",
    borderRadius: "50%"
}