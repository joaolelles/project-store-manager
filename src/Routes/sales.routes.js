const express = require('express');
const { salesControler } = require('../controllers');

const router = express.Router();

router.get('/', salesControler.selectAll);

router.get('/:id', salesControler.selectById);

module.exports = router;