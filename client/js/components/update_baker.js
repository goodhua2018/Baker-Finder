function renderUpdateBaker(event) {
  const updateBtn = event.target
  const bakerDOM = updateBtn.closest('.baker')

  const bakerId = bakerDOM.dataset.id
  const bakerImg = bakerDOM.dataset.img
  const bakerName = bakerDOM.dataset.name
  const bakerAddress = bakerDOM.dataset.address
  const bakerSuburb = bakerDOM.dataset.suburb
  const bakerPostcode = bakerDOM.dataset.postcode
  const bakerContact = bakerDOM.dataset.contact
  const bakerSpecialty = bakerDOM.dataset.specialty
  console.log(bakerDOM.dataset)
 


  document.querySelector('#page').innerHTML = `
  <section class ="add-baker mx-auto mt-4" style="width: 340px;">
  <form onSubmit="updateBaker(event)" id="render-form">
    <input type="hidden" name="id" value="${bakerId}">
    <div class="form-group">
      <label>Enter image url</label>
      <input type="text" class="form-control" name="img" value="${bakerImg}" required>
    </div>
    <div class="form-group">
      <label>Baker name</label>
      <input type="text" class="form-control" name="name" value="${bakerName}" required>
    </div>
    <div class="form-group">
      <label>Address</label>
      <input type="text" class="form-control" name="address" value="${bakerAddress}" required>
    </div>
    <div class="form-group d-inline-flex mt-2">
      <label>Suburb</label>
      <input type="text" class="form-control" name="suburb" value="${bakerSuburb}" required>
      <label>Postcode</label>
      <input type="text" class="form-control" name="postcode" value="${bakerPostcode}"required>
    </div>
    <div class="form-group">
      <label>Contact</label>
      <input type="text" class="form-control" name="contact" value="${bakerContact}" required>
    </div>
    <div class="form-group">
      <label>Specialty</label>
      <input type="text" class="form-control" name="specialty" value="${bakerSpecialty}" required>
    </div>
    <button type="submit" class="btn btn-light border-secondary">Update Baker</button>
  </form>
</section>
`
}

function updateBaker(event) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form))
  // console.log(data);
  bakerId = data.id;
  var bakerIndex = 0
  state.bakers.forEach((baker, index) => {
    if (baker.id == bakerId) {
        bakerIndex = index
    }
})

  fetch(`/api/bakers/${bakerId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
  })
      .then(res => res.json())
      .then(baker => {
        console.log(baker)
          state.bakers[bakerIndex] = baker;
          renderLoginPage()
      })
}

