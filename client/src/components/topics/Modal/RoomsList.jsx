import React, {useState, useEffect} from 'react';
import {Avatar, Button, CircularProgress} from '@mui/material';
import {Box, Grid, List, ListItem, ListItemText, ListItemAvatar} from '@mui/material';
import axios from 'axios';

const RoomsList = ({ topicId, search }) => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (topicId) {
            const timer = setTimeout(() => {
                axios.get(`/api/rooms/topic/${topicId}`)
                    .then(result => {
                        setRooms(result.data)
                        setLoading(false)
                    })
                    .catch(err => console.log(err))
            }, 300)
            return () => clearTimeout(timer)
        } else {
            axios.get(`/api/rooms/name/${search}`)
                .then(result => {
                    setRooms(result.data)
                })
                .catch(err => console.log(err))
        }
    }, [])

    let handleJoin = (e) => {
        // TODO
    }
    return (
        <Box>
            { loading ? 
            <Box>
                <Grid container sx={loadStyle}>
                    <CircularProgress /> 
                </Grid>
            </Box> :
            <Grid item sx={innerGrid}>
                <List>
                    {rooms.map(room => (
                        <ListItem sx={style} key={room.id} >
                            <ListItemAvatar >
                                {room.thumbnail ? <Avatar src={room.thumbnail} sx={imageStyle} />
                                : <Avatar style={imageStyle} alt='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'/>}
                            </ListItemAvatar >
                            <ListItemText sx={style} >
                                {room.name}
                            </ListItemText>
                            <Button
                                sx={{ marginRight: "10px" }}
                                size="medium"
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
            }
        </Box>
    )
}

export default RoomsList;

const style = {
    margin: "10px",
    display: "flex",
    alignItems: "center"
}

const loadStyle = {
    justifyContent: "center",
    border: "1px solid #000",
    margin: "auto",
    padding: "10px",
    height: "350px",
    width: "380px",
    overflowX: "visible"
}

const imageStyle = {
    margin: "5px",
    width: "50px",
    height: "50px",
    borderRadius: "50%"
}

const innerGrid = {
    border: "1px solid #000",
    height: "350px",
    width: "380px",
    overflowY: "scroll"
}