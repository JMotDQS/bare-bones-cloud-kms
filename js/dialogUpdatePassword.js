const updatePasswordCheck = () => {
	updatePasswordCheckPromise('updatePasswordCheck', dataCleanUp($('#update_password').val()), g_CURRENT_USER_ID).then(function(resolve) {
		if(parseInt(resolve) === 0) {
			getLots();
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