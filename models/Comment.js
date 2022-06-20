const { Schema, model, Types } = require('mongoose');
//import the dateFormat() function
const dateFormat = require('../utils/dateFormat');

//reply schema
const ReplySchema = new Schema(
    {
        //use unique identifier, replyId; have it generate the same type of ObjectId() value
        // set custom id to avoid confusion with parent comment's _id field
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String
        },
        writtenBy: {
            type: String    
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
          getters: true
        }
      }
    );

const CommentSchema = new Schema(
    {
    writtenBy: {
        type: String    
    },
    commentBody: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)       //format Date
    },
    //associate replies with comments; use ReplySchema to validate data for reply 
    replies: [ReplySchema]
},
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

//get total count of comments and replies
CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;