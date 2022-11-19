const { User } = require('../models');

module.exports = {
    // get all users
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // create user
    createUser(req, res) {
        User.create(req.body)
        .then(user(user => res.json(user)))
        .catch((err) => res.status(500).json(err));
    },
    // get single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .then((user) => {
            if(!user) {
                res.status(404).json({message: 'No user found with this ID'})
            } else {
                res.json(user)
            };
        })
        .catch((err) => res.status(500).json(err));
    },
    // update a single user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body},
            { runValidators: true, new: true})
            .then((user) => {
            if(!user) {
                res.status(404).json({ message: 'No user with this id found'})
            } else {
                res.json(user)
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    },
    // delete a single user
    deleteUser(req, res) {
        User.findOneAndDelete(
            { _id: req.params.userId })
            .then((user) => {
                if(!user) {
                    res.status(404).json({ message: 'No user found with this id'})
                } else {
                    res.json(user)
                }
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    // add a user to friend list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: {friends: { _id: req.params.friendId }}},
            { runValidators: true, new: true})
            .then((user) => {
                if(!user) {
                    res.status(404).json({ message: 'No user found with this id'})
                } else {
                    res.json(user)
                }
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    // delete a user from friend list
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }}
        )
        .then((user) => {
            if(!user) {
                res.status(404).json({ message: 'No user with this id' })
            } else {
                res.json(user)
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    },
};