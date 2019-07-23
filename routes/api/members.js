
const express = require('express');
const router = express.Router();
const uuid = require('uuid')
const members = require('../../Members')

// to create a route to return json data
// this returns all members
router.get('/', (req, res) => {
    res.json(members);
});

// to return a single member based on id
router.get('/:id', (req, res) => {
    // to see if the user exists
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No user id: ${req.params.id} found`})
    }
});


// Creates Member
router.post('/', (req,res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: `include name and email`})
    }

    members.push(newMember);
    res.json(members);
    // res.redirect('/');
});


// Updates member
router.put('/:id', (req, res) => {
    // to see if the user exists
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                res.json({ msg: 'Member updated', member });
            }
        })
    } else {
        res.status(400).json({ msg: `No user id: ${req.params.id} found`})
    }
});

// Delete Member
router.delete('/:id', (req, res) => {
    // to see if the user exists
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json({ 
            msg:'Member deleted', 
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ msg: `No user id: ${req.params.id} found`})
    }
});

module.exports = router;