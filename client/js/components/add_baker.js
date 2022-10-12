function renderAddBaker () {
  document.querySelector('#page').innerHTML = `
    <section class ="add-baker mx-auto mt-4" style="width: 340px;">
      <form onSubmit="addBaker(event)" id="render-form">
        <div class="form-group">
            <label>Enter image url</label>
            <input type="text" class="form-control" name="img" required>
        </div>
        <div class="form-group">
          <label>Baker name</label>
          <input type="text" class="form-control" name="name" required>
        </div>
        <div class="form-group">
          <label>Address</label>
          <input type="text" class="form-control" name="address" required>
        </div>
        <div class="form-group d-inline-flex mt-2">
          <label>Suburb</label>
          <input type="text" class="form-control" name="suburb" required>
          <label>Postcode</label>
          <input type="text" class="form-control" name="postcode" required>
        </div>
        <div class="form-group">
          <label>Contact</label>
          <input type="text" class="form-control" name="contact" required>
        </div>
        <div class="form-group">
          <label>Specialty</label>
          <input type="text" class="form-control" name="specialty" required>
        </div>
        <input type="hidden" class="form-control" name="creator" value="${state.loggedInEmail}" >
        <button type="submit" class="btn btn-light border-secondary">Add Baker</button>
      </form>
  </section>
  `
}

function addBaker(event) {
  event.preventDefault();
  const form = event.target;

  // takes data from the form html tag and converts it into an object literal.
  const data = Object.fromEntries(new FormData(form));

  // method POST
  fetch('/api/bakers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(baker => {
      state.bakers.push(baker)
      renderBakerList()
  })
}