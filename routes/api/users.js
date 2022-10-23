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
router.route('/').get(getAllUsers).post(createNewUser);

//Gets, updates and deletes one single user based on its Id. 
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

//creates and deletes a friend based on the user Id and friend Id as shown in the route
router.route('/:userId/friends/:friendId').post(addNewFriend).delete(deleteFriend);

module.exports = router