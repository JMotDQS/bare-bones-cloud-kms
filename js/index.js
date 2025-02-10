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
});

const refreshApp = () => {
	g_USER_SEARCH = [];
	g_NO_SEARCH_RESULTS = '';
	g_COMPANIES = [];
	g_NEW_LOCATION = '';
	g_ASSOCIATE_ITEMS = '';
	g_PRINT_USER_OBJ = {};

	document.getElementById('card-template-container').textContent = '';
	getSections();

	if (g_CURRENT_USER_ID == '0') {
		loadTemplate('login', g_DIALOG);
	} else {
		loadTemplate('kms');
	}
}

const getLot = () => {
	getLotPromise().then((resolve) => {
		g_CURRENT_LOT = [];
		g_CURRENT_LOT = resolve[0];
		setLot();
	}).catch(function(reject) {
		consoleReporting(reject);
	}).finally(function() {
		consoleReporting("Moving On.");
	});
}

const setLot = () => {
	document.getElementById('navbar-user').innerHTML = g_CURRENT_USER['first_name'] + "&nbsp;:&nbsp;" + g_CURRENT_LOT.lot_name;
	document.getElementById('navbar-user').classList.remove('nav-item-hide');

	closeDialog();
	getLotSlots();
	loadTemplate('kms');
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

const getLotSlots = () => {
	getLotSlotsPromise().then((resolve) => {
		resolve.forEach((lot, index) => {
			/******
				state: 1 = open/empty/available/true
				state: 0 = closed/occupied/unavailable/false
			******/
			lot_slots_state.push(
				{
					index: index,
					slot: lot.key_slot,
					pk_id: lot.pk_id,
					state: 1
				}
			);
		});
		initialLotSlotsState();

	}).catch(function(reject) {
		consoleReporting(reject);
	}).finally(function() {
		consoleReporting("Moving On.");
	});
}

const searchVINs = (param_vin) => {
	toggleDisabled('vin', true);
	toggleDisabled('search-button', true);
	searchVINsPromise(param_vin).then((resolve) => {
		bulk_vin_search_results = resolve;
		cur_lot_vin_search_results = bulk_vin_search_results['vins'].filter(lot => lot.lot_pk_id == g_CURRENT_LOT.pk_id);
		rem_lots_vin_search_results = bulk_vin_search_results['vins'].filter(lot => lot.lot_pk_id != g_CURRENT_LOT.pk_id);
		setCheckoutSearchResults();
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

const consoleReporting = (param) => {
	//console.log(param);
}