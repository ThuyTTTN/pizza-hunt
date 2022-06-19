//importing the schema constructor and model function
const { Schema, model } = require('mongoose');
//import the dateFormat function so that we can use it in this file
const dateFormat = require('../utils/dateFormat');

//Created a schema, using schema constructor that we imported from Mongoose; define the fields with specific data types
const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now, 
        get: (createdAtVal) => dateFormat(createdAtVal)     //Mongoose uses 'getters' to transform the data by default everytime its queried; 'get' transform data before it gets to the controller
    }, 
    size: {
        type: String,
        default: 'Large'
    }, 
    toppings: [],  //empty [], array data type
    comments: [     //added to associate Pizza and Comments Models
        {
            type: Schema.Types.ObjectId,    //tell Mongoose to expect an ObjectId and tell that its data comes from Comment model
            ref: 'Comment'                  // tells Pizza model which documents to search to find the right comments
        }
    ]
},
{
    //tell the schema that we can use virtuals
    toJSON: {
        virtuals: true,
        getters: true           //tell Mongoose model to use the 'getter' function 
    },
    id: false       //set to false b/c virtual mongoose usually returns an id
}
);

// get total count of comments and replies on retrieval
//virtuals allows us to add more info to the database response so that we don't have to add in the information manually with a helper before responding to the API request.
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

//Create the pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export the Pizza model
module.exports = Pizza;