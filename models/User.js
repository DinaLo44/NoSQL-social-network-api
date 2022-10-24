const { Schema, model } = require('mongoose');

const usersSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        /*The source to obtain this regex was the README file with the instructions for challenge 17 */
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    createdAt: {
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

usersSchema
    .virtual('friendCount').get(function () {
        return this.friends.length
    }
    );

const User = model('user', usersSchema);

module.exports = User;

