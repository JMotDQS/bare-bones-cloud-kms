function updatePasswordCheck() {
	updatePasswordCheckPromise('updatePasswordCheck', dataCleanUp($('#update_password').val()), g_CURRENT_LOGIN_USER_ID).then(function(resolve) {
		if(parseInt(resolve) === 0) {
			getLots();
			//closeDialogLogin();
			//getSections();
			//loadTemplate('kms');
			/*getCompaniesPromise().then(function(resolve) {
				loadPage('nav', g_NAV);
				closeDialogLogin();
			}).catch(function(reject) {
				console.log("reject:", reject);
			}).finally(function() {
				console.log("Moving On.");
			});*/
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