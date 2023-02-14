const express = require('express');
const { productControler } = require('../controllers');

const router = express.Router();

router.get('/', productControler.selectAll);

router.get('/:id', productControler.selectById);

router.post('/', productControler.insertProduct);

module.exports = router;