const express = require('express');
const router = express.Router();
const { getHabits, addHabit } = require('../controllers/habitController');

router.route('/').get(getHabits).post(addHabit);

module.exports = router;