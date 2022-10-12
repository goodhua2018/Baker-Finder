function renderSignUp() {
  document.querySelector('#page').innerHTML = `
  <section class ="signup">
            <form onSubmit="signUp(event)" class="mx-auto mt-4" style="width: 340px;" id="render-form">
                <h3 class="text-center">Sign Up</h3>
                <div class="form-group">
                    <span class= 'required'>*</span><label>Username</label>
                    <input type="text" class="form-control" name="userName" required>
                </div>
                <div class="form-group">
                    <span class= "required">*</span><label>Email</label>
                    <input type="email" class="form-control" name="email" required>
                </div>
                <div class="form-group">
                    <span class= "required">*</span><label>Password</label>
                    <input type="password" class="form-control" name="password" required>
                </div>
                <div class="form-group">
                    <span class= "required">*</span><label>Comfirm Password</label>
                    <input type="password" class="form-control" name="confirmPassword" required>
                </div>
                <div class="form-group mt-1">
                  <label for="">Are you a ...</label><br> 
                  <input type="radio" name="type" value="baker">
                  <label for="baker">Baker</label><br>
                  <input type="radio" name="type" value="sweet-tooth">
                  <label for="css">Sweet tooth</label><br>
                </div>
            <button type="submit" class="btn btn-light border-secondary">Sign Up</button>
        </form>
    </section>
  `
}

function signUp(event) {
  event.preventDefault()
  const form = event.target 

  const data = Object.fromEntries(new FormData(form))

  fetch('/api/users', {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify(data)
  })
      .then(res => res.json())
      .then(res => {
          if (res.error) {
              renderSignUp()
              renderError(res.error)
          } else {
              state.loggedInEmail = res.email
              renderBakerList()
          }     
      })
}

function renderError(errorMessage) {
  const page = document.querySelector('#page')
  page.innerHTML =
    `<h2 class ="text-center" style='color: rgb(129, 95, 95);'>${errorMessage}</h2>` +
    page.innerHTML
}
