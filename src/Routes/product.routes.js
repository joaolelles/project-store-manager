const express = require('express');
const { productControler } = require('../controllers');
const validateName = require('../middlewares/validateName');

const router = express.Router();

router.get('/', productControler.selectAll);

router.get('/:id', productControler.selectById);

router.post('/', validateName, productControler.insertProduct);

router.put('/:id', validateName, productControler.updateById);

module.exports = router;