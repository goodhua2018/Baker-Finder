function renderLoginPage() {
  if (state.loggedInUsertype === 'baker') {
    fetch(`/api/bakers/${state.loggedInEmail}/baker`)
      .then(res => res.json())
      .then(bakers => {
        console.log(bakers)
        state.bakersForBaker = bakers

        document.querySelector('#page').innerHTML = `
        <div class = "row">
          <section class="col-md-8 col-sm-1 col-lg-8 card-group m-3">${renderBakers()}</section> 
          <aside class = "col-md-3 col-sm-1 col-lg-3">
            <header class = "row d-block">
              <h3>Hello ${state.loggedInName}</h3>
              <a onClick = "renderAddBaker()" class="card-link">Add Baker</a>
            </header>
            <div class="baker-list card-group m-3">${renderBakersForBaker()}</div>
          </aside>
        </div>
        `
      })
  } else {
    document.querySelector('#page').innerHTML = `
    <div class = "row">
      <section class="col-md-8 col-sm-1 col-lg-8 card-group m-3">${renderBakers()}</section> 
      <aside class = "col-md-3 col-sm-1 col-lg-3">
        <header class = "row d-block mx-auto">
          <h3>Hello ${state.loggedInName}</h3>
        </header>
        <div class="baker-list card-group m-3">${renderSweetTooth()}</div>
        <div class="baker-list card-group m-3 each-user-review">${showEachUserReviews()}</div>
      </aside>
    </div>
    `
  }
}


function renderSweetTooth() {
  return `Welcome to your paradise!`
}