const router = require('express').Router();

//add addReply and removeReply
const { addComment, removeComment, addReply, removeReply } = require('../../controllers/comment-controller');

// api/coments/<pizzaId>
router.route('/:pizzaId').post(addComment);

// /api/comments/<pizzaId>/<commentId>
//PUT route; we're not creating a new reply, just updating it
router
  .route('/:pizzaId/:commentId')
  .put(addReply)
  .delete(removeComment)

//DELETE route to handle removeReply
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);


module.exports = router;