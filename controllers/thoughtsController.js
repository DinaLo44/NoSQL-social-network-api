const { Thought, User } = require('../models');

module.exports = {
//Gets all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
//gets only one thought based on the thoughtId 
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Sorry, NO thought was found with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
// creates a new thought
    createNewThought({body}, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    {_id: body.userId},
                    { $push: { thoughts: _id } },
                    //timestamps: false, eliminates the updatedAt field
                    { new: true, timestamps: false}
                )
            })
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'A thought was created, BUT NO user was found with that ID' })
                    : res.json('A thought was successfully created!')
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

//updates an existing thought based on the thoughtId
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { thoughtText: req.body.thoughtText },
            //timestamps: false, eliminates the updatedAt field
            { runValidators: true, new: true, timestamps: false }
        ).then((thought) =>
            !thought
                ? res.status(404).json({ message: 'Sorry, NO thought was found with this ID' })
                : res.json(thought))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
//deletes a thought based on its thoughtId
    deleteThought(req, res) {
        Thought.findOneAndDelete(
            { _id: req.params.thoughtId },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Sorry, NO thought was found with this ID' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        //timestamps: false, eliminates the updatedAt field
                        { new: true, timestamps: false },
                    )
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'A thought was removed, BUT NO user was found with this ID' })
                    : res.json({ message: 'Successful deletion of thought' }))
            .catch((err) => res.status(500).json(err));
    },

//creates a new reaction based on the thoughtId
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            //timestamps: false, eliminates the updatedAt field
            { runValidators: true, new: true, timestamps: false }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Sorry, NO thought was found with this ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

//deletes a reaction based on the thoughtId and reactionId
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            //timestamps: false, eliminates the updatedAt field
            { runValidators: true, new: true, timestamps: false }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Sorry, NO thought was found with this ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

};

