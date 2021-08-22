const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  }).then(results => {
    console.log(results)
    res.json(results);
  });
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"] 
      }
    ]
  }).then(results => {
    console.log(results);
    res.json(results);
  });
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create(req.body).then(category =>{
    res.json(category);
    console.log(category);
  });
  // create a new category
});

router.put('/:id', (req, res) => {
    Category.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(category => {
      res.json(category);
    });

  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(category => {
    res.json(category);
  });
  // delete a category by its `id` value
});

module.exports = router;
