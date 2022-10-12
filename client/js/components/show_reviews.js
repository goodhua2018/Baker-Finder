function showReview(bakerId) {
  fetch(`/api/reviews/${bakerId}`)
    .then(res => res.json())
    .then(res => {
      console.log(res)
      state.bakerReviews = res
      renderBakerReviews()
    })
}

function renderBakerReviews(bakerRating) {
  const bakerRatingShow = Math.round(bakerRating * 10) / 10
  document.querySelector('#page').innerHTML = `
    <section mt-3>
      <div class="stars-outer">
        <div class="stars-inner"></div>
      </div>
      <a class="attribution" href="http://fontawesome.io/"><i class="fa fa-font-awesome"></i></a>
      <p>${bakerRatingShow}</p>
    </section>
    <section >  
      ${bakerReviews()}
    </section>
    <script>
      document.querySelector
    </script>
`
  const starTotal = 5;
  const starPercentage = (bakerRating/ starTotal) * 100;
  const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
  document.querySelector(`.stars-inner`).style.width = starPercentageRounded; 
}

function bakerReviews() {
  // console.log(state.bakerReviews)
  return state.bakerReviews.map(review => `  
    <div class='baker card' >
    <div class="card-body">
        <h5 class="card-title">${review.user_name}</h5>
        <p class="card-text">${review.review}</p>
    </div>
  </div>
  `).join('')
}