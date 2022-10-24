const { Schema, model, Types } = require('mongoose');

const usersSchema = new Schema({
    //the user name must be a string, unique, trimmed and is a required field
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true
    },
    //email must be a string, unique, a required field and must match with the regex
    email: {
        type: String,
        required: true,
        unique: true,
        /*The source to obtain this regex was the README file with the instructions for challenge 17 */
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    thoughts: [
        //thoughts must be an array of id values and make reference to the Thought Model
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        //friends must be an array of id values and make reference to the User Model
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    createdAt: {
        //specifies the currrent date
        type: Date,
        default: Date.now,
    },
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
        timestamps: true,
    }
);

//created the friendCount field as a virtual in the usersSchema
usersSchema
    .virtual('friendCount').get(function () {
        return this.friends.length
    }
    );

const User = model('user', usersSchema);

module.exports = User;

