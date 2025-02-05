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
			document.getElementById('nav_links').classList.remove('hide-element');
			document.getElementById('kms-nav-item').classList.add('active');
			break;
		
		case 'checkin':
			clearNavActive();
			document.getElementById("card-template-container").innerHTML = checkinTemplate();
			document.getElementById('title').textContent = g_SECTIONS[g_CHOSEN_SECTION].section;
			iconClassArray = g_SECTIONS[g_CHOSEN_SECTION].icon.split(" ");
			document.getElementById('icon').classList.add(...iconClassArray);
			setKeyEvents(temp_page, 'vin', .5);
			setKeyEvents(temp_page, 'slot', .5);
			setClasses(temp_page);
			toggleDisabled('slot', false);
			setFocus('vin');
			toggleDisabled('slot', true);
			toggleDisabled('checkin-button', true);
			displayOpenSlots();
			document.getElementById('checkin-button').classList.add('button-disabled');

			document.getElementById('checkin-button').addEventListener('click', () => {
				console.log("Check In Button clicked");
				toggleDisabled('checkin-button', true);
				toggleDisabled('vin', true);
				toggleDisabled('slot', true);
				checkInVin();
			});
			break;

		case 'checkout':
			clearNavActive();
			document.getElementById("card-template-container").innerHTML = checkoutTemplate();
			document.getElementById('title').textContent = g_SECTIONS[g_CHOSEN_SECTION].section;
			iconClassArray = g_SECTIONS[g_CHOSEN_SECTION].icon.split(" ");
			document.getElementById('icon').classList.add(...iconClassArray);
			setKeyEvents(temp_page, 'vin', 0);
			setClasses(temp_page);
			setFocus('vin');
			toggleDisabled('search-button', true);
			document.getElementById('search-button').classList.add('button-disabled');

			document.getElementById('vin').addEventListener('keydown', (event) => {
				if(document.getElementById('vin').value.length > 0 && event.key === "Enter") {
					searchVINs(document.getElementById('vin').value);
				}
			});
			document.getElementById('clear-button').addEventListener('click', () => {
				resetTemplate();
			});
			break;

		case 'reports':
			clearNavActive();
			document.getElementById("card-template-container").innerHTML = reportsTemplate();
			document.getElementById('title').textContent = g_SECTIONS[g_CHOSEN_SECTION].section;
			iconClassArray = g_SECTIONS[g_CHOSEN_SECTION].icon.split(" ");
			document.getElementById('icon').classList.add(...iconClassArray);
			setClasses(temp_page);

			setKeyEvents(temp_page, 'vin', .5);
			break;
		
		case 'labels':
			document.getElementById("card-template-container").innerHTML = labelsTemplate(param_template);
			break;

		case 'search':
			document.getElementById("card-template-container").innerHTML = searchTemplate(param_template);
			break;

		case 'dashboard':
			document.getElementById("card-template-container").innerHTML = dashboardTemplate(param_template);
			break;
	}
};