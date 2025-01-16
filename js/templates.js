const loadTemplate = (param_template, param_type = '') => {
	var temp_page = param_template;
	if (param_type == '') {
		if (param_template.page != undefined) {
			temp_page = param_template.page;
			g_CHOSEN_SECTION = parseInt(param_template.index);
		}
	}
	
	switch(temp_page) {
		case "login":
			document.getElementById("g_dialog").innerHTML = dialogLoginTemplate();
			APP_DIALOG.showModal();

			document.getElementById('dialog-login-form-button').addEventListener('click', () => {
				userLoginCheck();
				userTimeout();
			});
			document.getElementById('dialog-login-grid').addEventListener('keydown', (event) => {
				if(event.key === 'Enter') {
					console.log("login:Enter Key pressed");
					userLoginCheck();
					userTimeout();
				}
			});
			break;

		case "passwordUpdate":
			document.getElementById("g_dialog").innerHTML = dialogPasswordUpdateTemplate();	
			setKeyEvents(temp_page, 'update_password', .5);
			setKeyEvents(temp_page, 'update_password_conf', .5);
			toggleDisabled('dialog-password-update-form-button', true);
			document.getElementById('dialog-password-update-form-button').classList.add('button-disabled');
			document.getElementById('update_password').focus();

			document.getElementById('dialog-password-update-form-button').addEventListener('click', () => {
				updatePasswordCheck();
			});
			document.getElementById('dialog-password-grid').addEventListener('keydown', (event) => {
				if(event.key === 'Enter' && !checkIfDisabled('dialog-password-update-form-button')) {
					updatePasswordCheck();
				}
			});
			break;
		
		case 'kms':
			document.getElementById("card-template-container").innerHTML = kmsTemplate();
			removeClass('disable-hover');
			setClasses();
			break;
		
		case 'checkin':
			console.log("checkin template loaded");
			document.getElementById("card-template-container").innerHTML = checkinTemplate();
			document.getElementById('title').textContent = g_SECTIONS[g_CHOSEN_SECTION].section;
			setKeyEvents(temp_page, 'vin', .5);
			setKeyEvents(temp_page, 'slot', .5);
			setClasses(temp_page);
			toggleDisabled('slot', false);
			setFocus('vin');
			toggleDisabled('slot', true);
			toggleDisabled('checkin-button', true);
			document.getElementById('checkin-button').classList.add('button-disabled');
			//makeVisible('card-template-container');

			document.getElementById('checkin-button').addEventListener('click', () => {
				console.log("Check In Button clicked");
				checkInVin();
			});
			//document.getElementById('checkin-button').addEventListener('keypress', (event) => {
			//document.getElementById('checkin-l-group').addEventListener('keypress', (event) => {
				//console.log("event.key:", event.key);
				/*if(event.key === 'Enter' && !checkIfDisabled('checkin-button')) {
					console.log("Enter Key pressed");
					document.getElementById('checkin-button').click();
					//checkInVin();
				} else {
					console.log("wrong key");
				}*/
			//});
			break;

		case 'checkout':
			document.getElementById("card-template-container").innerHTML = checkoutTemplate(param_template);
			break;
		
		case 'labels':
			document.getElementById("card-template-container").innerHTML = labelsTemplate(param_template);
			break;

		case 'search':
			document.getElementById("card-template-container").innerHTML = searchTemplate(param_template);
			break;

		case 'reports':
			document.getElementById("card-template-container").innerHTML = reportsTemplate(param_template);
			break;

		case 'dashboard':
			document.getElementById("card-template-container").innerHTML = dashboardTemplate(param_template);
			break;
	}
}

/*const loadDialog = (param_template, param_template_dir, param_load_ele, param_user_id = 0) => {
	var temp_dir = "pages/" + param_template_dir + "/";
	if (param_template != '') {
		temp_dir += param_template + ".html?nc=" + (Math.random() * 1000000);

		$('#' + param_load_ele).load(temp_dir,
			function(responseTxt, statusTxt, xhr) {
				switch(statusTxt) {
					case "success":
						pageCheck(param_template, param_user_id);
						break;

					case "error":
						break;
				}
		});
	}
}*/

/*const pageCheck = (param_page, param_user_id) => {
	clearTimer(g_TIMER);

	switch(param_page) {
		case "login":
			LOGIN_DIALOG.showModal();
			document.getElementById('dialog-login-form-button').addEventListener('click', () => {
				userLoginCheck();
			});
			document.getElementById('dialog-login-grid').addEventListener('keydown', (event) => {
				if(event.key === 'Enter') {
					userLoginCheck();
				}
			});
			break;

		case "passwordUpdate":
			setKeyEvents(param_page, 'update_password', .5);
			setKeyEvents(param_page, 'update_password_conf', .5);
			toggleDisabled('dialog-password-update-form-button', true);
			document.getElementById('dialog-password-update-form-button').classList.add('button-disabled');
			document.getElementById('update_password').focus();
			document.getElementById('dialog-password-update-form-button').addEventListener('click', () => {
				updatePasswordCheck();
			});
			document.getElementById('dialog-password-grid').addEventListener('keydown', (event) => {
				if(event.key === 'Enter' && !checkIfDisabled('dialog-password-update-form-button')) {
					updatePasswordCheck();
				}
			});
			break;
		
		case "lotChoice":
			// build dropdown with lots and add event listener to it onchange to automatically move on and set needed variables.	
			CHOOSE_LOT_DIALOG.showModal();	
			closeDialogLogin();
			break;
	}
}*/