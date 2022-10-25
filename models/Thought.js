const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema({
    //the reactionId must be an id type genereated by default
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    //reactionBody maximum 280 characters long, must be a strng and is a required field
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    //username must be a string and is a required field
    username: {
        type: String,
        required: true,
    },
    //specifies the current date
    createdAt: {
        type: Date,
        default: Date.now,
        get: () => {
            return moment().format("MMM Do, YYYY, hh:mm:ss a");
        }, 
    },
},
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
        _id: false,
        
    }
);


const thoughtsSchema = new Schema({
    //thoughtText must be a string, a required field, with aminimum of 1 character and a maximum of 280
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    //specifies the current date
    createdAt: {
        type: Date,
        default: Date.now,
        get: () => {
            return moment().format("MMM Do, YYYY, hh:mm:ss a");
        }, 
    },
    //username must be a string and a required field
    username: {
        type: String,
        required: true,
    },
    // reactions is an array of the reactionSchema
    reactions: [reactionSchema]
},
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
        
    }
);

//creates a reactionCount field as a virtual in the thoughtSchema
thoughtsSchema
    .virtual('reactionCount').get(function () {
        return this.reactions.length;
    });

const Thought = model('thought', thoughtsSchema);

module.exports = Thought;