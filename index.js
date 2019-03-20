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
            message: 'error retrieving user', error
        })
    })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

   db.users.findById(id).then(user => {
        if(!user) {
            return  res.status(404).json({ message: 'This user is dead'})
        }
        else {
       res.status(200).json(user);
        }
  
  }).catch(error => {
    res.status(500).json({
        message: 'error retrieving hubs', error
    })
})

})




server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    if(!req.body.name || !req.body.bio){
        res.status(400).json({ message: 'name and bio required' })
    } else {
      
    console.log('user info', userInfo);
    db.users.insert(userInfo)
            .then(user => {
                res.status(201).json(user);
        })
                .catch(error => {
                    res.status(500).json({message: 'error retrieving user', error})
                }) 
            }

});

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.users.remove(id).then(deleted => {
        res.status(204).end()
    }).catch(error => {
        res.status(500).json({message: "The user could not be removed"})
    })
    
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const change = req.body;
    console.log(id);
    db.users
    .update(id, change)
    .then(updated => {
    if (updated) {
        res.status(200).json(updated);
        } else {
        res.status(404).json({ message: 'user not found' });
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'error updating user' });
    });
})



server.listen(5000, () => {
    console.log('\n** API up and running')
});
