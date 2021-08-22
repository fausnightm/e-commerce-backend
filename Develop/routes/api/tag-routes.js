const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    attributes: ["id", "tag_name"],
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
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
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
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  Tag.create(req.body).then(tag =>{
    res.json(tag);
    console.log(tag);
  });
  // create a new tag
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.body.id
    }
  }).then(tag => {
    res.json(tag);
  });
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(tag => {
    res.json(tag);
  });
  // delete on tag by its `id` value
});

module.exports = router;
