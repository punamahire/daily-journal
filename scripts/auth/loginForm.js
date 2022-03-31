export const loginForm = () => {

	return `
		<div class="newPost">
		<h3>Login</h3>
      <div>
        <input value=""
          name="name"
          class="newEntry__input"
          type="text"
          placeholder="User Name" />
          <br><br>
      </div>
      <div>
        <input value=""
          name="email"
          class="newEntry__input"
          type="text"
          placeholder="name@place.com" />
          <br><br>
      </div>
        <button id="login__submit">Login</button> &emsp; &emsp;
        <button id="login__cancel">Cancel</button>
		</div>
	`
}