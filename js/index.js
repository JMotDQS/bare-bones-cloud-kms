$(document).ready(function() {
	if ('IdleDetector' in window) {
		console.log("IdleDetector supported");
		const controller = new AbortController();
		const signal = controller.signal;
	} else {
		// Fallback to the event listener approach
		console.log("IdleDetector NOT supported");
	}

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
		//loadDialog('login', g_DIALOG, 'dialog_login');
		loadTemplate('login', g_DIALOG);
	} else {
		loadTemplate('kms');
	}
}

const getLots = () => {
	getLotsPromise().then((resolve) => {
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

function getSlotAvailability(param_lot, param_slot) {
	getSlotAvailabilityPromise(param_lot, param_slot).then((resolve) => {
		if (resolve.length > 0) {
			console.log("length > 0");
			return false;
		}
		console.log("length = 0");
		return true;
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

	closeDialog();
	getSections();
	loadTemplate('kms');
}

const consoleReporting = (param) => {
	//console.log(param);
}