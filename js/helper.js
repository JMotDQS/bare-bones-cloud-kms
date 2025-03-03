const userTimeout = async () => {
	if ((await IdleDetector.requestPermission()) !== 'granted') {
		consoleReporting("Permission denied");
		return;
	} else {
		consoleReporting("Permission granted");
		const idleDetector = new IdleDetector();
		idleDetector.addEventListener('change', () => {
			const userState = idleDetector.userState;
			if (userState === 'idle') {
				consoleReporting('User is inactive');
				logOut();
			} else {
				consoleReporting('User is active');
			}
		});
		
		idleDetector.start(
			{
				threshold: g_IDLE_TIMEOUT_VAL
			}
		);
	}
};

const logOut = () => {
	document.location.href = g_ROOT_PATH;
};

const dataCleanUp = (param_string) => {
	var temp_string = param_string.trim().replace(/&/g, "&amp;");
	var temp_len = g_SEARCH_ENTITIES.length;
	for(i = 0; i < temp_len; i++) {
		temp_string = temp_string.replace(new RegExp(g_SEARCH_ENTITIES[i], 'g'), g_REPLACE_ENTITIES[i]);
	}
	return temp_string;
};
const reverseEntities = (param_string) => {
	var temp_string;
	if(typeof param_string == "string") {
		temp_string = param_string.trim().replace(/&amp;/g, "&");
		var temp_len = g_SEARCH_ENTITIES.length;
		for(i = 0; i < temp_len; i++) {
			temp_string = temp_string.replace(new RegExp(g_REPLACE_ENTITIES[i], 'g'), g_SEARCH_ENTITIES[i]);
		}
		return temp_string;
	}
};

const initialLotSlotsState = () => {
	// do stuff
	initialLotSlotsStatePromise().then(function(resolve) {
		if(resolve.length > 0) {
			// lot has slots that are not open
			resolve.forEach((slot_closed, index) => {
				setLotSlotsState(lot_slots_state.filter(slot => slot.KeySlot === slot_closed.KeySlot)[0].KeySlot, 0);
			});
		}

	}).catch(function(reject) {
		consoleReporting("reject:", reject);
	}).finally(function() {
		consoleReporting("Moving On.");
	});
};

const setLotSlotsState = (param_slot, param_state) => {
	lot_slots_state[lot_slots_state.filter(slot => slot.KeySlot === `${param_slot.toUpperCase()}`)[0].index].state = parseInt(param_state);
};

const feedBackColoring = (param_ele, param_color = 'default') => {
	clearClassList(param_ele).classList.add('feedback-' + param_color);
};

const removeClass = (param_class) => {
	document.getElementById('card-template-container').classList.remove(param_class);
};

const setClasses = (param_page_class) => {
	document.getElementById("card-template-container").classList = [];
	document.getElementById("card-template-container").classList.add('grid-container');
	if (param_page_class != undefined) {
		document.getElementById("card-template-container").classList.add('disable-hover', 'card', 'card-' + param_page_class);
		document.getElementById("card-template-container").classList.add('sub-grid-container');
	}
};

const clearClassList = (param_ele, param_copy) => {
	document.getElementById(param_ele).classList = '';
	return document.getElementById(param_ele);
};

const setElementCopy = (param_ele, param_copy = '') => {
	document.getElementById(param_ele).textContent = param_copy;
};

const setFocus = (param_ele) => {
	document.getElementById(param_ele).focus();
};

const toggleDisabled = (param_ele, param_disabled = false) => {
	document.getElementById(param_ele).removeAttribute('disabled');
	if (param_disabled) {
		document.getElementById(param_ele).setAttribute('disabled', param_disabled);
	}
};

const makeVisible = (param_ele) => {
	document.getElementById(param_ele).classList.remove('invisible');
};

const checkIfDisabled = (param_element) => {
	return document.getElementById(param_element).disabled;
};

const cleanVIN = (param_vin_scan) => {
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
};

const startTimer = (param_multiplier = 1) => {
	clearTimer(g_TIMER);
	g_TIMER = window.setTimeout(() => {
		return true;
	}, (g_TIMEOUT_VAL * parseInt(param_multiplier)));
};

const closeDialog = () => {
	APP_DIALOG.close();
	APP_DIALOG.textContent = '';
};

const loginEncrypt = (param_value) => {
	return CryptoJS.MD5(param_value).toString();
};

const consoleReporting = (param) => {
	console.log(param);
};