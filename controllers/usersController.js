const { User, Thought } = require('../models');

module.exports = {
//gets all existing users
    getAllUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

//gets only one user based on the userId
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Sorry, NO user found with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

  // create a new user
    createNewUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
//updates a user based on the userId
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId },
            { $set: req.body } ,
            { runValidators: true, new: true }
        ).then((user) =>
        !user
        ? res.status(404).json({message: 'Sorry, NO user found with this ID'})
        : res.json(user))
        .catch((err) => res.status(500).json(err));
    },
//deletes a user based on the userId
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'Sorry, NO user found with that ID' })
              : Thought.deleteMany({ _id: { $in: user.thoughts } })
          )
          .then(() => res.json({ message: 'Successful deletion of user and thoughts' }))
          .catch((err) => res.status(500).json(err));
      },
//creates a friend based on the userId
      addNewFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'Sorry, NO user found with this ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
//deletes a friend based on the userId
      deleteFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'Sorry, NO user found with this ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
   
}

