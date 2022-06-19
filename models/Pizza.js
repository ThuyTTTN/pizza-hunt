//importing the schema constructor and model function
const { Schema, model } = require('mongoose');

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
        default: Date.now 
    }, 
    size: {
        type: String,
        default: 'Large'
    }, 
    toppings: [] //empty [], array data type
});

//Create the pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export the Pizza model
module.exports = Pizza;