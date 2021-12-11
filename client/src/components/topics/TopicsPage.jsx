import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from 'axios';

import Navbar from '../navbar/Navbar.jsx';
import TopicCard from './components/topicCard.jsx';
import Motivational from './components/motivation.jsx';
import TopicsModal from './Modal/TopicsModal.jsx';

const TopicsPage = ({ user, setUser }) => {
  const [topics, setTopics] = useState([]);
  const [search, setSearch] = useState('');
  const [currentTopicId, setCurrentTopicId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = (id) => {
    setCurrentTopicId(id);
    setOpenModal(true);
  }

  const handleClose = () => {
    setOpenModal(false);
    setSearch('');
  }

  useEffect(() => {
    axios.get('/api/topics')
      .then(res => setTopics(res.data))
      .catch(err => console.log(err))
  }, [])

  const searchHandler = (e) => {
    setSearch(e.target.value);
  }
  
  const submitHandler = (e) => {
    e.preventDefault();
    setCurrentTopicId(null);
    setOpenModal(true);

    console.log('search: ', search)
  }

  return (
    <div>
      <Container>
        <Grid sx={{ marginTop: "auto", marginBottom: "20px" }}>
        <Navbar user={user} setUser={setUser} />
        <Box container sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", overflowX: "visible", margin: "3px", padding: "3px" }}>
            <h1 style={{alignSelf: "flex-start"}}>Choose a Topic</h1>
            <Motivational />
            <Box sx={{ display: 'flex', alignItems: 'flex-end', mr: 5, mb: "auto" }}>
                <SearchIcon sx={{ mr: 1, my: 0.5 }}/>
                <form onSubmit={e => submitHandler(e)}>
                  <TextField
                    variant="standard"
                    label="Find a Room" 
                    size="medium"
                    onChange={e => searchHandler(e)}
                  />
                </form>
            </Box>
        </Box>
        </Grid>
        <Grid container item spacing={1} sx={{ display: "flex", flexDirection: "row", justifyContent: "center", overFlowX: "visible" }}>
             {topics.map((topic) => (
              <Grid
                sx={{ margin: "20px", padding: "20px" }}
                item xs={3} 
                key={topic.id} 
                onClick={(e) => handleOpen(e.target.name)}
              >
                <TopicCard
                  topic={topic.name}
                  pic={topic.url}
                  name={topic.id}
                />
              </Grid>
            ))}
        </Grid>
        <TopicsModal
          openModal={openModal}
          handleClose={handleClose}
          topicId={currentTopicId}
          search={search}
          user={user}
        />
      </Container>
    </div>
  )
}

export default TopicsPage;

// return (
  // <Container>
  //   <Navbar user={user} setUser={setUser} />
  //   <Grid container spacing={1}>
  //     <Grid container item spacing={3}>
  //       <Grid item xs={3} sx={{ marginTop: "auto", marginBottom: "20px" }}>
  //         <h1>Choose a Topic</h1>
  //       </Grid>
  //       <Grid item xs={6}>< Motivational /></Grid>
  //       <Grid item xs={3} sx={{ marginTop: "auto", marginBottom: "20px" }}>
  //         <form onSubmit={e => submitHandler(e)}>
  //           <TextField label="Find a Room" onChange={e => searchHandler(e)} />
  //         </form>
  //       </Grid>
  //     </Grid>
  //     <Box sx={{ flexGrow: 1 }}>
  //       <Grid container spacing={1}>
  //         <Grid container item spacing={3}>
  //           {topics.map((topic) => (
  //             <Grid item xs={4} key={topic.id} onClick={(e) => handleOpen(e.target.name)}>
  //               <TopicCard
  //                 topic={topic.name}
  //                 pic={topic.url}
  //                 name={topic.id}
  //               />
  //             </Grid>
  //           ))}
  //         </Grid>
  //         <TopicsModal
  //           openModal={openModal}
  //           handleClose={handleClose}
  //           topicId={currentTopicId}
  //           search={search}
  //           user={user}
  //         />
  //       </Grid>
  //     </Box>
  //   </Grid>
  // </Container>
// )