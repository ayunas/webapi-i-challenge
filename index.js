// implement your API here
const express = require('express');
const server = express();
const db = require('./data/db');

server.use(express.json());

//************************************************************************* */
server.get('/', (req,res) => {
    res.send('server is alive');
})
//************************************************************************* */
server.get('/now', (req,res) => {
    const now = new Date().toISOString();
    res.send(now);
})
//************************************************************************* */

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
//************************************************************************* */
server.get('/api/users/:id', (req,res) => {
    const userID = req.params.id;
    db.findById(userID)
    .then( user => {
        if (user) {
            res.status(200).json({ success : true, user : user })
        } else {
            res.status(404).json({success : false, message : 'no user exists with that id'})
        }
    })
    .catch( err => {
        console.log('there has been an error', err);
        res.status(err.code).json({success : false, message : err.message});
    })
})




server.listen(5000, () => {
    console.log('listening on port 5000');
})

