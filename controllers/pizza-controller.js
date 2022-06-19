const { Pizza } = require("../models");

const pizzaController = {
  //get all pizzas
  //serve as the callback function for the GET /api/pizzas route
  //.find() is similar to sequelize .findAll()
  getAllPizza(req, res) {
    Pizza.find({})
      //populate a field by chaining populate() method onto query, passing in an object with the key path plus the value of the field
      .populate({
        path: "comments",
        select: "-__v", //tell mongoose that we don't care about the __v fields on comments; - means we dont want it to be returned
      })
      .select("-__v") //update query to not include pizza's __v
      .sort({ _id: -1 }) //sore in DESC order by _id so that the newest pizza returns first
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //get one pizza by id
  //instead of accessing the entire req, we've destructured params out of it; its the only data we need for this request
  getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
      .populate({
        path: "comments",
        select: "-__v",
      })
      .select("-__v")
      .then((dbPizzaData) => {
        // If no pizza is found, send 404
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //createPizza
  createPizza({ body }, res) {
    Pizza.create(body)
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => res.status(400).json(err));
  },

  //update pizza by id
  //.findOneAndUpdate() finds a single document, updates it, and return document
  // {new:true} is the 3rd parameter to return the new update; if not it will return the original document.
  updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //delete pizza
  //alternatively, you can use .deleteOne() or .deleteMany()
  //.findOneAndDelete() provides more data in case client wants it
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = pizzaController;
