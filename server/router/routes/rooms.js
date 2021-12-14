const express = require('express');
const axios = require('axios');
const url = require('../../config.js').api_url

const router = express.Router();

//Get all rooms
router.get('/', (req, res) => {
  axios.get(url)
    .then((data) => {
      res.send(data.data).status(200);
    })
    .catch((err) => res.send(err).status(500));
});

//Search by name for specific room
router.get('/name/:name', (req, res) => {
  console.log(req.params.name)
  axios.post(url + '/rooms/search', {"search_value": req.params.name})
    .then((data) => { res.send(data.data).status(200)
    })
    .catch((err) => res.send(err).status(500));
});

//Get array of rooms by Topic ID
router.get('/topic/:topicId', (req, res) => {
  axios.get(url + `/topic/${req.params.topicId}/rooms`)
    .then((data) => { res.send(data.data).status(200); })
    .catch((err) => res.send(err).status(500));
});

//Post new room to DB ({name: string, topic_id: number, thumbnail: string, max_users: number, is_private: bool, admin_id: number})
router.post('/create/:topicId', (req, res) => { // POST /rooms/:topic_id/create
  axios.post(url + `/${req.params.topicId}/rooms/create`, req.body)
    .then((data) => {
      console.log(data.data)
      // res.send(data.data).status(201);
    })
    .catch((err) => res.send(err).status(500));
});

module.exports = router;