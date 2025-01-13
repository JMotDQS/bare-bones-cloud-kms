$(document).ready(function() {
	refreshApp();
	getSections();
});

function refreshApp() {
	g_USER_SEARCH = [];
	g_NO_SEARCH_RESULTS = '';
	g_COMPANIES = [];
	g_NEW_LOCATION = '';
	g_ASSOCIATE_ITEMS = '';
	g_PRINT_USER_OBJ = {};

	document.getElementById('card-template-container').textContent = '';

	if (g_CURRENT_LOGIN_USER_ID == '0') {
		loadDialog('login', g_DIALOG, 'dialog_login');
	} else {
		loadTemplate('kms');
	}
}

function getLots() {
	getLotsPromise(g_CURRENT_LOGIN_USER_ID, g_CURRENT_USER['is_admin']).then((resolve) => {
		g_LOTS = [];
		g_LOTS = resolve;
		console.log("getLots():g_LOTS:", g_LOTS);
		chooseLot();
		/*if (g_LOTS.length > 1) {
			document.getElementById('navbar-link-lots').classList.remove('nav-item-hide');
			document.getElementById('navbar-link-lots-divider').classList.remove('nav-item-hide');
		} else {
			document.getElementById('navbar-link-lots').classList.add('nav-item-hide');
			document.getElementById('navbar-link-lots-divider').classList.add('nav-item-hide');
		}

		if(parseInt(g_CURRENT_USER['change_password']) === 1) {
			loadDialog('passwordUpdate', g_DIALOG, 'dialog_login');
		} else {
			document.getElementById('navbar-user').innerHTML = g_CURRENT_USER['first_name'];
			document.getElementById('navbar-user').classList.remove('nav-item-hide');
			closeDialogLogin();
			getSections();
			loadTemplate('kms');
		}*/
	}).catch(function(reject) {
		consoleReporting(reject);
	}).finally(function() {
		consoleReporting("Moving On.");
	});
}

function getSections() {
	getSectionsPromise().then((resolve) => {
		g_SECTIONS = [];
		g_SECTIONS = resolve['sections'];
		g_CONNECTION = resolve['conn'];
	}).catch(function(reject) {
		consoleReporting(reject);
	}).finally(function() {
		consoleReporting("Moving On.");
	});
}

function getCompanies() {
	getCompaniesPromise().then(function(resolve) {
		console.log("getCompaniesPromise:Success");
	}).catch(function(reject) {
		console.log("reject:", reject);
	}).finally(function() {
		console.log("Moving On.");
	});
}

function buildCompanyDropdown(param_element) {
	var temp_html = `<option selected="true" disabled="disabled" value="">Please Choose Company</option>`;
	for(i = 0; i < g_COMPANIES.length; i++) {
		temp_html += `<option value="${g_COMPANIES[i]['abb_name']}" data-compId=${g_COMPANIES[i]['pk_id']}>${g_COMPANIES[i]['company_name']}</option>`
	}
	$('#' + param_element).html(temp_html);
}

function dataCleanUp(param_string) {
	var temp_string = param_string.trim().replace(/&/g, "&amp;");
	var temp_len = g_SEARCH_ENTITIES.length;
	for(i = 0; i < temp_len; i++) {
		temp_string = temp_string.replace(new RegExp(g_SEARCH_ENTITIES[i], 'g'), g_REPLACE_ENTITIES[i]);
	}
	return temp_string;
}
function reverseEntities(param_string) {
	var temp_string;
	if(typeof param_string == "string") {
		temp_string = param_string.trim().replace(/&amp;/g, "&");
		var temp_len = g_SEARCH_ENTITIES.length;
		for(i = 0; i < temp_len; i++) {
			temp_string = temp_string.replace(new RegExp(g_REPLACE_ENTITIES[i], 'g'), g_SEARCH_ENTITIES[i]);
		}
		return temp_string;
	}
}

function feedBackColoring(param_ele, param_color = 'default') {
	clearClassList(param_ele.id).classList.add('feedback-' + param_color);
}

function clearClassList(param_ele, param_copy) {
	document.getElementById(param_ele).classList = '';
	return document.getElementById(param_ele);
}

function setElementCopy(param_ele, param_copy = '') {
	document.getElementById(param_ele).textContent = param_copy;
}

function sliderSet(param_id, param_copy) {
	if($('#' + param_id).is(':checked')) {
		$('#active-label_' + param_id).removeClass('user-inactive');
		$('#active-label_' + param_id).html('Is ' + param_copy);
	} else {
		$('#active-label_' + param_id).addClass('user-inactive');
		$('#active-label_' + param_id).html('Not ' + param_copy);
	}
}

function sliderClicked(e, param_copy) {
	e.preventDefault;
	let temp_id = parseInt(e.slice(e.indexOf('_') + 1));
	let temp_field = param_copy;
	let temp_value;
	if($('#' + e).is(':checked')) {
		$('#active-label_' + e).removeClass('user-inactive');
		$('#active-label_' + e).html('Is ' + param_copy);
		temp_value = 1;

		if(param_copy == 'Admin') {
			loadDialog('addAdmin', g_DIALOG, 'dialog_add_admin', temp_id);
		} else {
			sliderUpdateRecord('sliderUpdateUser', temp_id, temp_field, temp_value);
		}
	} else {
		$('#active-label_' + e).addClass('user-inactive');
		$('#active-label_' + e).html('Not ' + param_copy);
		temp_value = 0;

		sliderUpdateRecord('sliderUpdateUser', temp_id, temp_field, temp_value);
	}
}

function setFocus(param_ele) {
	document.getElementById(param_ele).focus();
}

function toggleDisabled(param_ele, param_disabled = false) {
	document.getElementById(param_ele).removeAttribute('disabled');
	if (param_disabled) {
		document.getElementById(param_ele).setAttribute('disabled', param_disabled);
	}
}
function toggleDisplay(param_ele, param_class, param_flag) {
	if (param_flag) {
		$(param_ele).addClass(param_class);
	} else {
		$(param_ele).removeClass(param_class);
	}
}

function makeVisible(param_ele) {
	document.getElementById(param_ele).classList.remove('invisible');
}

function checkIfDisabled(param_element) {
	return document.getElementById(param_element).disabled;
}

function setKeyEvents(param_page, param_element, param_multiplier = 1) {
	$('#' + param_element).on('keypress', {page: param_page, inputEl: param_element, timerMultiplier: param_multiplier}, keyPressEvent);
	$('#' + param_element).on('keyup', {page: param_page, inputEl: param_element, timerMultiplier: param_multiplier}, keyUpEvent);
}

function clearTimer(param_timer) {
	window.clearTimeout(param_timer); // prevent errant multiple timeouts from being generated
}

function keyPressEvent(e) {
	e.preventDefault;
	clearTimer(g_TIMER); // prevent errant multiple timeouts from being generated

	const myEle = document.getElementById(e.data.inputEl);
	switch(e.data.page) {
		case 'checkin':
			switch(e.data.inputEl) {
				case 'vin':
					feedBackColoring('vin-feedback', 'blue');
					setElementCopy(myEle.id + '-feedback', 'Checking VIN...');
					break;

				case 'slot':
					break;
			}
			break;
	}
}
function keyUpEvent(e) {
	e.preventDefault;
	clearTimer(g_TIMER); // prevent errant multiple timeouts from being generated
	const hasInput = document.getElementById(e.data.inputEl).value != '';
	const myEle = document.getElementById(e.data.inputEl);
	switch(e.data.page) {
		case 'checkin':
			switch(e.data.inputEl) {
				case 'vin':
					g_TIMER = window.setTimeout(() => {
						if (hasInput) {
							if (cleanVIN(document.getElementById(e.data.inputEl).value)) {
								feedBackColoring(myEle.id + '-feedback', 'green');
								setElementCopy(myEle.id + '-feedback', 'VIN is Validated.');
								feedBackColoring(myEle.id, 'green');
								setElementCopy(myEle.id, myEle.value);
								toggleDisabled('vin', true);
								toggleDisabled('slot', false);
								document.getElementById('container-slot').classList.remove('disable-input');
								setFocus('slot');
							} else {
								feedBackColoring(myEle.id + '-feedback', 'red');
								setElementCopy(myEle.id + '-feedback', 'Invalid VIN');
								feedBackColoring(myEle.id, 'red');
								setElementCopy(myEle.id, myEle.value);
							}
						} else {
							clearClassList(myEle.id);
							clearClassList(myEle.id + '-feedback');
							setElementCopy(myEle.id + '-feedback');
						}
					}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));
					break;

				case 'slot':
					g_TIMER = window.setTimeout(() => {
						/*toggleDisabled('#binNum', true);
						collectBinScan();*/
					}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));
					break;
			}
			break;

		case 'passwordUpdate':
			g_TIMER = window.setTimeout(() => {
				var pw = document.getElementById('update_password').value;
				var pwc = document.getElementById('update_password_conf').value;

				if(pw === pwc && pw != '' && pwc != '') {
					feedBackColoring(document.getElementById('dialog-password-error'), 'green');
					document.getElementById('dialog-password-error').textContent = 'Passwords match!';
					document.getElementById('dialog-password-error').classList.remove('invisible');
					toggleDisabled('dialog-password-update-form-button', false);
					document.getElementById('dialog-password-update-form-button').classList.remove('button-disabled');
				} else if(pw == '' && pwc == '') {
					document.getElementById('dialog-password-error').textContent = '&nbsp;';
					document.getElementById('dialog-password-error').classList.add('invisible');
					toggleDisabled('dialog-password-update-form-button', true);
					document.getElementById('dialog-password-update-form-button').classList.add('button-disabled');
				} else {
					feedBackColoring(document.getElementById('dialog-password-error'), 'red');
					document.getElementById('dialog-password-error').textContent = 'Passwords MUST match!';
					document.getElementById('dialog-password-error').classList.remove('invisible');
					toggleDisabled('dialog-password-update-form-button', true);
					document.getElementById('dialog-password-update-form-button').classList.add('button-disabled');
				}
			}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));
			break;
	}
}

function cleanVIN(param_vin_scan) {
	g_CURRENT_VIN = param_vin_scan;
	if (param_vin_scan.charAt(0).toUpperCase() === "I") {
		g_CURRENT_VIN = param_vin_scan.substring(1);
	}

	if(parseInt(g_CURRENT_VIN.length) === g_VIN_LENGTH) {
		return g_CURRENT_VIN.toUpperCase();
	} else {
		g_CURRENT_VIN = '';
		return false;
	}
}

const logOut = () => {
	document.location.href = g_ROOT_PATH;
}

const chooseLot = () => {
	console.log("chooseLot() called");
	console.log("chooseLot():g_LOTS.length:", g_LOTS.length);

	document.getElementById('navbar-user').innerHTML = g_CURRENT_USER['first_name'];
	document.getElementById('navbar-link-lots').classList.add('nav-item-hide');
	document.getElementById('navbar-link-lots-divider').classList.add('nav-item-hide');
	document.getElementById('navbar-user').classList.remove('nav-item-hide');
	if (g_LOTS.length < 1) {
		closeDialogLogin();
		getSections();
		loadTemplate('kms');
	}
	if (g_LOTS.length == 1) {
		console.log("chooseLot():if reached");
		document.getElementById('navbar-user').innerHTML += "&nbsp;:&nbsp;" + g_LOTS[0]['lot_name'];
		//document.getElementById('navbar-user').classList.remove('nav-item-hide');

		/*document.getElementById('navbar-link-lots').classList.add('nav-item-hide');
		document.getElementById('navbar-link-lots-divider').classList.add('nav-item-hide');*/

		closeDialogLogin();
		getSections();
		loadTemplate('kms');
	}
	if (g_LOTS.length > 1) {
		console.log("chooseLot():else reached");
		loadDialog('lotChoice', g_DIALOG, 'dialog_lot_choice');
	}
}

function consoleReporting(param) {
	//console.log(param);
}