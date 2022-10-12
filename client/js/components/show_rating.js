function showRating(bakerId) {
  fetch(`/api/ratings/${bakerId}`)
    .then(res => res.json())
    .then(rating => {
      console.log(rating) 
      state.bakerRating = rating.avg
      renderBakerReviews(state.bakerRating)
    })
}

