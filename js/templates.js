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
		/*
		case "kms":
			setIndexContent();
			break;

		case "checkin":
			setTemplate();
			break;

		case "checkout":
			setTemplate();
			break;

		case "labels":
			setTemplate();
			break;

		case "search":
			setTemplate();
			break;

		case "reports":
			setTemplate();
			break;

		case "dashboard":
			setTemplate();
			break;
		
		case "addUser":
			buildCompanyDropdown('dialog_user_company');
			openDialogUser(g_NO_SEARCH_RESULTS);
			break;

		case "itemAssociation":
			openDialogUser();
			setKeyEvents(param_page, 'dialog_user_location_id');
			$('#dialog_user_asso_button').on('click', recordAssociation);
			break;
		*/

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

		case "addAdmin":
			setKeyEvents(param_page, 'add-admin_email', .5);
			toggleDisabled('#dialog-add-admin-form-button', true);
			document.getElementById('dialog-add-admin-form-button').classList.add('button-disabled');
			document.getElementById('dialog-add-admin-form-button').addEventListener('click', () => {
				validateEmail(param_user_id);
			});
			document.getElementById('dialog-add-admin-grid').addEventListener('keydown', (event) => {
				if(event.key === 'Enter') {
					validateEmail(param_user_id);
				}
			});
			ADD_ADMIN_DIALOG.showModal();
			break;

		case "bulkAddUser":
			buildCompanyDropdown('dialog_bulk_add_user_company');
			document.getElementById('dialog-bulk-add-user-button').addEventListener('click', () => {
				sendBulkAddUserData();
			});

			setdialogBulkAddUserEventListenerAssociations();
			BULK_ADD_USER_DIALOG.showModal();
			break;
	}
}
/*
function setTemplate() {
	document.getElementById('title').textContent = g_SECTIONS[g_CHOSEN_SECTION].section;
	var tempClassArray = g_SECTIONS[g_CHOSEN_SECTION].icon.split(" ");
	tempClassArray.forEach((myClass) => {
		document.getElementById('icon').classList.add(myClass);
	});
	var temp_page = g_SECTIONS[g_CHOSEN_SECTION].section.replaceAll(' ','').toLowerCase();
	document.getElementById('card-template-container').classList.add('card-' + temp_page);

	var temp_html = '';
	switch(temp_page) {
		case 'checkin':
			temp_html += `
				<div>
					<div class="card inset-container">
						<label for="vin">VIN:</label>
						<input id="vin" name="vin" type="text" />
						<p id="vin-feedback"></p>
					</div>

					<div class="card inset-container disable-input">
						<label for="slot">Slot:</label>
						<input id="slot" name="slot" type="text" />
					</div>
				</div>

				<div>
					<div class="card inset-container">
						<h3>Available Slots by Case</h3>
					</div>
				</div>`;
			document.getElementById('card-template-body').innerHTML = temp_html;

			setFocus('vin');
			toggleDisabled('slot', true);
			setKeyEvents(temp_page, 'vin');
			setKeyEvents(temp_page, 'slot');
			break;
	}
}
*/