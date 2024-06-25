const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true

        },
        email: {
            type: String,
            required: true,
            unique: true,
            //must match a valid email address 
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        thoughts: [{
            //_id values referencing the thought model 
            type: Schema.Types.ObjectId,
            ref: 'thought'
        },
        ],

        friends: [{
            //_id values referencing the thought model 
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        ],
        //array of _id vaules referencing tje user model(self reference)
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
    //schema settings --create a virtual "friendcount"
    //that retrieves the length of user's freinds array field on query//

);
userSchema.virtual('friendCount').get(function () {
    return this.friends.length
})

const User = model('user', userSchema);

module.exports = User;

