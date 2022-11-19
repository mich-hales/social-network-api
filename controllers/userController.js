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

    },
    // get single user
    getSingleUser(req, res) {

    },
    // update a single user
    updateUser(req, res) {

    },
    // delete a single user
    deleteUser(req, res) {

    },
    // add a user to friend list
    addFriend(req, res) {

    },
    // delete a user from friend list
    deleteFriend(req, res) {

    }
};