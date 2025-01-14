function userLoginCheck(e) {
	var email_address = dataCleanUp($('#login_email').val());
	var pass = dataCleanUp($('#login_password').val());

	userLoginCheckPromise('userLoginCheck', email_address, pass).then(function(resolve) {
		if(resolve.length == 0) {
			document.getElementById('dialog-login-error').textContent = 'email/password do not match for user';
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
					loadDialog('passwordUpdate', g_DIALOG, 'dialog_login');
				} else {
					getLots();
				}
			} else {
				document.getElementById('dialog-login-error').textContent = 'You are NOT an Admin and/or Active';
				feedBackColoring(document.getElementById('dialog-login-error').id, 'red');
				document.getElementById('dialog-login-error').classList.add('dialog-error-show');
			}
		}

	}).catch(function(reject) {
		console.log("reject:", reject);
	}).finally(function() {
		console.log("Moving On.");
	});
}

function closeDialogLogin() {
	LOGIN_DIALOG.close();
}