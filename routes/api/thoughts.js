const router = require('express').Router();

const {
    getAllThoughts,
    getOneThought,
    createNewThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtsController');

//Gets all thoughts and posts new thoughts
//path: /api/thoughts
router.route('/').get(getAllThoughts).post(createNewThought);

//Gets, updates and deletes one thought based on its thought Id. 
//path: /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

//creates a reaction in the specified thought Id
//path: /api/thoughts/thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

//deletes the reaction based on the specified thought Id
//path: /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;