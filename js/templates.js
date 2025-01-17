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
			document.getElementById('nav_links').classList.remove('hide-element')
			break;
		
		case 'checkin':
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

			document.getElementById('checkin-button').addEventListener('click', () => {
				console.log("Check In Button clicked");
				checkInVin();
			});
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
};