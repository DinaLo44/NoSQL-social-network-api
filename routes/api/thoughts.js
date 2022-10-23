const router = require('express').Router();

const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtsController');

//Gets all thoughts and posts new thoughts
router.route('/').get(getAllThoughts).post(createThought);

//Gets, updates and deletes one thought based on its thought Id. 
router.route('/:thoughtId'),get(getOneThought).put(updateThought).delete(deleteThought);

//creates a reaction in the specified thought Id
router.route('/:thoughtId/reactions').post(createReaction);

//deletes the reaction based on the specified thought Id
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;