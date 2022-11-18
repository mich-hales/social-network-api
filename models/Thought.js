const { Schema, model } = require('mongoose');

// reaction schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.Objectid,
        default: new Types.Objectid
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

// thought schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ reactionSchema ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
    }
);

// a virtual that retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;