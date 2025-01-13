const loadTemplate = (param_template) => {
	var temp_page = param_template;
	if (param_template.page != undefined) {
		temp_page = param_template.page;
		g_CHOSEN_SECTION = parseInt(param_template.index);
	}

	switch(temp_page) {
		case 'kms':
			document.getElementById("card-template-container").innerHTML = kmsTemplate();
			removeClass('disable-hover');
			setClasses();
			break;
		
		case 'checkin':
			document.getElementById("card-template-container").innerHTML = checkinTemplate();
			document.getElementById('title').textContent = g_SECTIONS[g_CHOSEN_SECTION].section;
			setClasses(temp_page);
			setFocus('vin');
			toggleDisabled('slot', true);
			setKeyEvents(temp_page, 'vin');
			setKeyEvents(temp_page, 'slot');
			makeVisible('card-template-container');
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

const removeClass = (param_class) => {
	document.getElementById('card-template-container').classList.remove(param_class);
}

const setClasses = (param_page_class) => {
	document.getElementById("card-template-container").classList = [];
	document.getElementById("card-template-container").classList.add('grid-container');
	if (param_page_class != undefined) {
		document.getElementById("card-template-container").classList.add('disable-hover', 'card', 'card-' + param_page_class);
	}
}



/*
function loadPage(param_template, param_element = 'app') {
	var temp_dir = "";
	temp_dir = `pages/${param_element}/${param_template}.html?nc=${(Math.random() * 1000000)}`
	//temp_dir = `pages/${param_element}/sectionTemplate.html?nc=${(Math.random() * 1000000)}`

	$('#' + param_element).load(temp_dir,
		function(responseTxt, statusTxt, xhr) {
			switch(statusTxt) {
				case "success":
					if(param_template == 'kms') {
						pageCheck(param_template);
					} else {
						pageCheck(g_SECTIONS[g_CHOSEN_SECTION].section.replaceAll(' ','').toLowerCase());
					}
					//pageCheck(g_CURRENT_PAGE);
					break;

				case "error":
					break;
			}
	});
}
*/

function loadDialog(param_template, param_template_dir, param_load_ele, param_user_id = 0) {
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
}

function pageCheck(param_page, param_user_id) {
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
			/**** build dropdown with lots and add event listener to it onchange to automatically move on and set needed variables. ****/	
			CHOOSE_LOT_DIALOG.showModal();	
			closeDialogLogin();
			break;
	}
}