function renderLogin() {
  document.querySelector('#page').innerHTML = `
  <section class ="login">
        <form onSubmit="logIn(event)" class="mx-auto mt-4" style="width: 340px;" id="render-form">
            <h3 class="text-center">Login</h3>
            <div class="form-group">
                <span class= "required">*</span><label>Email</label>
                <input type="email" class="form-control" name="email" required>
            </div>
            <div class="form-group">
                <span class= "required">*</span><label>Password</label>
                <input type="password" class="form-control" name="password" required>
            </div>
        <button type="submit" class="btn btn-light border-secondary">Login</button>
    </form>
</section>
  `
}

function logIn(event) {
  event.preventDefault()
  const form = event.target

  const data = Object.fromEntries(new FormData(form))
  // console.log(data)
  
  fetch('/api/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      if (res.error) {
        renderLogin()
        renderError(res.error)
      } else {
        const userName = res.email
        const userType = res.type
        const userRealName = res.name
        console.log(userName)
        console.log(userType)
        console.log(userRealName)
        state.loggedInEmail = userName
        state.loggedInUsertype = userType
        state.loggedInName = userRealName
        renderLoginPage()
      }
    })
}

function renderError(errorMessage) {
  const page = document.querySelector('#page')
  page.innerHTML =
    `<h2 style='color: rgb(129, 95, 95);'>${errorMessage}</h2>` + page.innerHTML
}

function logout() {
  fetch('/api/sessions', {
    method: 'DELETE'
  })
  .then(() => {
    state.loggedInEmail = null
    state.loggedInUsertype = null
    state.loggedInName = null
    renderBakerList()
  })
}