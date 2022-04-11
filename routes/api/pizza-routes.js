const router = require('express').Router();
const {
  getAllPizza,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza
} = require('../../controllers/pizza-controllers');

// set up GET all and POST at /api/pizzas

router
  .route('/')
  .get(getAllPizza)
  .post(createPizza);

// set up GET on, PUT, and DELETE at /api/pizzas/:d
router
  .route('/:id')
  .get(getPizzaById)
  .put(updatePizza)
  .delete(deletePizza);


module.exports = router;