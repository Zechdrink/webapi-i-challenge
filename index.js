// implement your API here\
const express = require('express');

const server = express();

const db = require('./data/db.js');

server.use(express.json());


server.get('/api/users', (req, res) => {
    db.users.find().then(users => {
        res.status(200).json(users);
    }).catch(error => {
        res.status(500).json({
            message: 'error retrieving hubs', error
        })
    })
})

server.post('/api/users', (req, res) =>{
    const userInfo = req.body;
    console.log('user info', userInfo);

    db.users
    .add(userInfo)
    .then(users => {
        res.status(201).json(users)
    })
});


server.listen(5000, () => {
    console.log('\n** API up and running')
});
