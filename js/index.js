$(document).ready(function() {
	refreshApp();
	getSections();
});

const refreshApp = () => {
	g_USER_SEARCH = [];
	g_NO_SEARCH_RESULTS = '';
	g_COMPANIES = [];
	g_NEW_LOCATION = '';
	g_ASSOCIATE_ITEMS = '';
	g_PRINT_USER_OBJ = {};

	document.getElementById('card-template-container').textContent = '';

	if (g_CURRENT_USER_ID == '0') {
		loadDialog('login', g_DIALOG, 'dialog_login');
	} else {
		loadTemplate('kms');
	}
}

const getLots = () => {
	getLotsPromise(g_CURRENT_USER_ID, g_CURRENT_USER['is_admin']).then((resolve) => {
		g_LOTS = [];
		g_LOTS = resolve;
		g_CURRENT_LOT = [];
		g_CURRENT_LOT = resolve;

		chooseLot();
	}).catch(function(reject) {
		consoleReporting(reject);
	}).finally(function() {
		consoleReporting("Moving On.");
	});
}

const getSections = () => {
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

const setElementCopy = (param_ele, param_copy = '') => {
	document.getElementById(param_ele).textContent = param_copy;
}

const setFocus = (param_ele) => {
	document.getElementById(param_ele).focus();
}

const chooseLot = () => {

	document.getElementById('navbar-user').innerHTML = g_CURRENT_USER['first_name'] + "&nbsp;:&nbsp;" + g_CURRENT_LOT[0]['lot_name'];
	document.getElementById('navbar-user').classList.remove('nav-item-hide');
	document.getElementById('navbar-link-lots').classList.add('nav-item-hide');
	document.getElementById('navbar-link-lots-divider').classList.add('nav-item-hide');

	closeDialogLogin();
	getSections();
	loadTemplate('kms');
}

const consoleReporting = (param) => {
	//console.log(param);
}