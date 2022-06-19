const { Comment, Pizza } = require('../models');

const commentController = {
    //add comment to pizza
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
            .then(({_id}) => {                      //with _id, we can use this to add comment to pizza
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    { $push: { comments: _id } },       //use $push metho to add the comment's _id to specific pizza; adds data to array
                    { new: true }                   // new:true, means we're getting back the updated pizza data with new comments
                );
        })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this id! '});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    },

    //remove comment; delete comment and remove it from the pizza that it's associated with
    removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.commentId })         //deletes the doc while returning its data
            .then(deletedComment => {
                if (!deletedComment) {
                    return res.status(404).json({ message: 'No comment with this id!' });
                }
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    { $pull: { comments: params.commentId } },       //$pull= take the data to identify and move it from associated pizza
                    { new: true }       //return new updated comment and data to the user
                );
            })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                  res.status(404).json({ message: 'No pizza found with this id!' });
                  return;
                }
                res.json(dbPizzaData);
              })
              .catch(err => res.json(err));
          }
};

module.exports = commentController;