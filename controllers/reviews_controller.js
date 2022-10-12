const express = require('express')
const router = express.Router()

const Reviews = require('../models/review')
const User = require('../models/user')

router.post('/', (req, res) => {
  const {bakerId, review, rating, email} = req.body
  User
    .findByEmail(email)
    .then(user => {
      const userName = user.name 
      Reviews
      .create(bakerId, review, rating, userName)
      .then(review => res.json({message: `Thank you for reviewing this baker!`}))
  })
})

router.get('/:bakerId', (req, res) => {
  const bakerId = req.params.bakerId
  Reviews
    .findAllReviews(bakerId)
    .then(reviews => res.json(reviews))

})

router.get('/:userName/eachUser', (req, res) => {
  const userName = req.params.userName
  Reviews
    .findEachUserReviews(userName)
    .then(reviews => res.json(reviews))

})

router.delete('/:id', (req, res) => {
  const reviewId = req.params.id;

    Reviews
      .delete(reviewId)
      .then(() => res.json({ message: 'delete'}))
  
})



module.exports = router