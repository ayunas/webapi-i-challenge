// implement your API here
const express = require('express');
const server = express();
const db = require('./data/db');



server.get('/', (req,res) => {
    res.send('server is alive');
})

server.get('/api/users', (req,res) => {
    db.find()
    .then( users => {
        res.json(users);
    })
    .catch( err => {
        console.log('there has been an error');
        res.json({error : err, message : 'an error occured'});
    });
});

server.listen(5000, () => {
    console.log('listening on port 5000');
})

