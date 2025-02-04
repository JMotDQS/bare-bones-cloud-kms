const dialogPasswordUpdateTemplate = () => {
	var temp_html = '';
	temp_html += `<header class="dialog-header">
					<div id="title">
						<h2>Update Password</h2>
				</header>
				<div class="dialog-grid dialog-grid-gap" id="dialog-password-grid">
					<div class="dialog-form-element">
						<input type="password" id="update_password" name="update_password" placeholder="New Password" autocomplete="off" />
					</div>
					<div class="dialog-form-element">
						<input type="password" id="update_password_conf" name="update_password_conf" placeholder="Confirm Password" autocomplete="off" />
					</div>
					<p class="dialog-password-error invisible" id="dialog-password-error">&nbsp;</p>
					<button id="dialog-password-update-form-button" class="dialog-form-button">Update</button>
				</div>`;
	return temp_html;
}

const updatePasswordCheck = () => {
	updatePasswordCheckPromise('updatePasswordCheck', loginEncrypt(dataCleanUp($('#update_password').val())), g_CURRENT_USER_ID).then(function(resolve) {
		if(parseInt(resolve) === 0) {
			getLot();
		}else {
			feedBackColoring(document.getElementById('dialog-password-error'), 'red');
			document.getElementById('dialog-password-error').textContent = 'Password change failed';
			document.getElementById('dialog-password-error').classList.remove('invisible');
		}
	}).catch(function(reject) {
		console.log("reject:", reject);
	}).finally(function() {
		console.log("Moving On.");
	});
}