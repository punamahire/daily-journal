export const registerForm = () => {

	return `
		<div class="newPost">
		<h3>Register</h3>
      <div>
        <input value=""
        name="registerName"
        class="newEntry__input"
        type="text"
        placeholder="User Name" />
        <br><br>
      </div>
      <div>
        <input value=""
        name="registerEmail"
        class="newEntry__input"
        type="text"
        placeholder="name@place.com" />
        <br><br>
      </div>
        <button id="register__submit">Register</button> &emsp; &emsp;
        <button id="login__cancel">Cancel</button>
		</div>
	`
}