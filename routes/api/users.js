const router = require("express").Router();
const {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateUser,
    deleteUser,
    addNewFriend,
    deleteFriend
} = require('../../controllers/usersController');

//Gets all users and posts new thoughts
//path: /api/users
router.route('/').get(getAllUsers).post(createNewUser);

//Gets, updates and deletes one single user based on its Id. 
//path: /api/users/:userId
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

//creates and deletes a friend based on the user Id and friend Id as shown in the route
//path: /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addNewFriend).delete(deleteFriend);

module.exports = router