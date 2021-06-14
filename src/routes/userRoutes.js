const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get(
    '/',
    userController.index
);

router.get(
    '/:id',
    async (req, res) => {
        userController.show(req, res)
    }
);

module.exports = router;