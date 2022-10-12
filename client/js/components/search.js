function searchByWord(event) {
  event.preventDefault()
  let inputDOM = document.querySelector('.form-control')
  let searchWord = inputDOM.value

  fetch(`/api/bakers/${searchWord}`)
    .then(res => res.json())
    .then(baker => {
      state.searches = baker
      if (state.searches.length == 0) {
        renderSearchError()
      } else {
        renderSearchList()
      } 
    })
}

function renderSearchList() {
  if (state.loggedInEmail === null) {
    document.querySelector('#page').innerHTML = `
      <section class='baker-list card-group m-3'>
        ${renderSearchs()}
      </section>
      <div><a onClick = "renderBakerList()">◀︎ Back to Home</a></div>
  `

  } else {
    document.querySelector('#page').innerHTML = `
      <div class = "row">
        <section class="col-md-8 col-sm-1 col-lg-8 card-group m-3">${renderSearchsForUser()}</section> 
        <aside class = "col-md-3 col-sm-1 col-lg-3">
          <header class = "row d-block">
            <h3>${state.loggedInName}</h3>
            <a onClick = "renderAddBaker()" class="card-link">Add Baker</a>
          </header>
          <div class="baker-list card-group m-3">${renderBakersForBaker()}</div>
        </aside>
      </div>
      `
    }
}

function renderSearchs() {
  return state.searches.map(baker => `  
    <div class='baker card' data-id='${baker.id}' data-img='${baker.img}' data-name='${baker.name}' data-address='${baker.address}' data-suburb='${baker.suburb}' data-postcode='${baker.postcode}' data-contact='${baker.contact}' data-specialty='${baker.specialty}'>
    <img class="card-img-top" src="${baker.img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${baker.name}</h5>
      <p class="card-text">${baker.address}, ${baker.suburb}, ${baker.postcode}</p>
      <p class="card-text">${baker.contact}</p>
      <p class="card-text"><small class="text-muted">${baker.specialty}</small></p>
    </div>
  </div>
`).join('')
} 

function renderSearchsForUser() {
  return state.searches.map(baker => `  
    <div class='baker card' data-id='${baker.id}' data-img='${baker.img}' data-name='${baker.name}' data-address='${baker.address}' data-suburb='${baker.suburb}' data-postcode='${baker.postcode}' data-contact='${baker.contact}' data-specialty='${baker.specialty}'>
    <img class="card-img-top" src="${baker.img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${baker.name}</h5>
      <p class="card-text">${baker.address}, ${baker.suburb}, ${baker.postcode}</p>
      <p class="card-text">${baker.contact}</p>
      <p class="card-text"><small class="text-muted">${baker.specialty}</small></p>
      <a onClick = "rate(event)" class="card-link">Rating</a>
      <a onClick = "review(event)" class="card-link">Review</a>
    </div>
  </div>
`).join('')
} 

function renderSearchError() {
  if (state.loggedInEmail === null) {
    document.querySelector('#page').innerHTML = `
      <section class='baker-list card-group m-3'>
        <h2> Sorry! There is no baker in this area.</h2>
        <div><a onClick = "renderBakerList()">◀︎ Back to Home</a></div>
      </section>
  `
  } else {
    document.querySelector('#page').innerHTML = `
      <div class = "row">
        <section class="col-md-8 col-sm-1 col-lg-8 card-group m-3">Sorry! There is no baker in this area.</section> 
        <aside class = "col-md-3 col-sm-1 col-lg-3">
          <header class = "row d-block">
            <h3>${state.loggedInName}</h3>
            <a onClick = "renderAddBaker()" class="card-link">Add Baker</a>
          </header>
          <div class="baker-list card-group m-3">${renderBakersForBaker()}</div>
          <div><a onClick = "renderBakerList()">◀︎ Back to Home</a></div>
        </aside>
      </div>
      
 
      `
  }
}
