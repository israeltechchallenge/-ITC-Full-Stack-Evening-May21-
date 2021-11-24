const router = require('express').Router();
const { insertProduct, getProducts } = require('../lib/queries/products');
const S = require('fluent-json-schema');

router.get('/', async function (req, res) {
  const results = await getProducts(req.query.isActive === 'true');
  res.send({ products: results });
});

const NewProductSchema = S.object()
  .prop('name', S.string().required())
  .prop('price', S.number().required());

router.post('/', async function (req, res) {
  if (req.validate(NewProductSchema)) {
    try {
      const { name, price } = req.body;
      const id = await insertProduct(name, price)
      res.send({ id });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: 'Internal server error' });
    }
  }
});

module.exports = router;