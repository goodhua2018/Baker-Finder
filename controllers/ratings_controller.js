const express = require('express')
const router = express.Router()

const Reviews = require('../models/review')

router.get('/:bakerId', (req, res) => {
  const bakerId = req.params.bakerId
  Reviews
    .findRating(bakerId)
    .then(rating => res.json(rating))
})


module.exports = router