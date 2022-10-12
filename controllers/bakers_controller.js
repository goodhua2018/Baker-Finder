const express = require('express')
const router = express.Router()

const Baker = require('../models/baker')

// routes
router.get('/', (req, res) => {
    Baker
      .findAll()
      .then(bakers => res.json(bakers))
})

router.post('/', (req, res) => {
  const {img, name, address, suburb, postcode, contact, specialty, creator} = req.body

  Baker
    .create(img, name, address, suburb, postcode, contact, specialty, creator)
    .then(baker => res.json(baker))
})

router.delete('/:id', (req, res) => {
  const bakerId = req.params.id;

    Baker
      .delete(bakerId)
      .then(() => res.json({ message: 'delete'}))
  
})

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const img = req.body.img;
  const name = req.body.name;
  const address = req.body.address;
  const suburb = req.body.suburb;
  const postcode = req.body.postcode;
  const contact = req.body.contact;
  const specialty = req.body.specialty;
  

  Baker
    .update(id, img, name, address, suburb, postcode, contact, specialty)
    .then(baker => res.json(baker))
})

router.get('/:searchWord', (req, res) => {
  const searchWord = req.params.searchWord
  // searchWord is a postcode or a suburb
  const numberFormOfWord = Number(searchWord)
  if (isNaN(numberFormOfWord)) {
    const modifyWord = searchWord.toLowerCase()
    Baker
      .searchBySuburb(modifyWord)
      .then(bakers => res.json(bakers))
    
   
  } else {
    Baker
      .searchByPostcode(searchWord)
      .then(bakers => res.json(bakers))
    
  }
})

router.get('/:loggedInEmail/baker', (req, res) => {
  const loggedInEmail = req.params.loggedInEmail
  // console.log(loggedInBakerName)
  
 
    Baker
      .findABaker(loggedInEmail)
      .then(bakers => {
        console.log(bakers)
        return res.json(bakers)
      })
  
})

router.get('/:bakerId/find', (req, res) => {
  const bakerId = req.params.bakerId
  
 
    Baker
      .findReviewedBakerById(bakerId)
      .then(bakers => {
        console.log(bakers)
        return res.json(bakers)
      })
  
})


module.exports = router

