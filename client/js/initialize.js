const state = {
  bakers: [],
  loggedInEmail: null,
  loggedInUsertype: null,
  loggedInName: null,
  bakersForBaker: []
}
const reviews = {
  reviews: []

}


fetch('/api/bakers')
  .then(res => res.json())
  .then(bakers => {
  state.bakers = bakers
  renderBakerList()
})

fetch('/api/sessions')
  .then(res => res.json())
  .then(user => {
    if (typeof user.email === 'string') {
      console.log(user)
      state.loggedInEmail = user.email
      state.loggedInName = user.name
      state.loggedInUsertype = user.type
      renderBakerList()
    }
  })