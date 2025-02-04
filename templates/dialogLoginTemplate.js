const dialogLoginTemplate = () => {
	var temp_html = '';
	temp_html += `<header class="dialog-header">
					<div id="title">
						<h2>Login</h2>
				</header>
				<div class="dialog-grid dialog-grid-gap" id="dialog-login-grid">
					<div class="dialog-form-element">
						<input type="email" id="login_email" name="login_email" placeholder="Email">
					</div>
					<div class="dialog-form-element">
						<input type="password" id="login_password" name="login_password" placeholder="Password">
					</div>
					<p class="dialog-error invisible" id="dialog-login-error"></p>
					<button id="dialog-login-form-button" class="dialog-form-button">Login</button>
				</div>`;
	return temp_html;
}

const userLoginCheck = (e) => {
	var email_address = dataCleanUp($('#login_email').val());
	var pass = loginEncrypt(dataCleanUp($('#login_password').val()));

	userLoginCheckPromise('userLoginCheck', email_address, pass).then(function(resolve) {
		if(resolve.length == 0) {
			document.getElementById('dialog-login-error').textContent = LOGIN_CREDENTIALS_MISMATCH;
			feedBackColoring(document.getElementById('dialog-login-error').id, 'red');
			document.getElementById('dialog-login-error').classList.remove('invisible');
		} else {
			if(parseInt(resolve[0]['is_active']) === 1) {
				document.getElementById('dialog-login-error').textContent = '';
				document.getElementById('dialog-login-error').classList.add('invisible');
				feedBackColoring(document.getElementById('dialog-login-error').id);
				g_CURRENT_USER = resolve[0];
				g_CURRENT_USER_ID = g_CURRENT_USER['pk_id'];

				if(parseInt(resolve[0]['change_password']) === 1) {
					loadTemplate('passwordUpdate', g_DIALOG);
				} else {
					getLot();
				}
			} else {
				document.getElementById('dialog-login-error').innerHTML = LOGIN_NONACTIVE_USER_ERROR;
				feedBackColoring(document.getElementById('dialog-login-error').id, 'red');
				document.getElementById('dialog-login-error').classList.add('dialog-error-show');
				toggleDisabled('login_email', true);
				toggleDisabled('login_password', true);
				document.getElementById('dialog-login-form-button').textContent = 'Return Home';
				document.getElementById('dialog-login-form-button').addEventListener('click', () => {
					logOut();
				});
			}
		}

	}).catch(function(reject) {
		console.log("reject:", reject);
	}).finally(function() {
		console.log("Moving On.");
	});
}