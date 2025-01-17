const userTimeout = async () => {
	if ((await IdleDetector.requestPermission()) !== 'granted') {
		console.log("Permission denied");
		return;
	} else {
		console.log("Permission granted");
		const idleDetector = new IdleDetector();
		idleDetector.addEventListener('change', () => {
			const userState = idleDetector.userState;
			if (userState === 'idle') {
				console.log('User is inactive');
				logOut();
			} else {
				console.log('User is active');
			}
		});
		
		idleDetector.start(
			{
				threshold: g_IDLE_TIMEOUT_VAL
			}
		);
	}
}

const dataCleanUp = (param_string) => {
	var temp_string = param_string.trim().replace(/&/g, "&amp;");
	var temp_len = g_SEARCH_ENTITIES.length;
	for(i = 0; i < temp_len; i++) {
		temp_string = temp_string.replace(new RegExp(g_SEARCH_ENTITIES[i], 'g'), g_REPLACE_ENTITIES[i]);
	}
	return temp_string;
}
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
}

const feedBackColoring = (param_ele, param_color = 'default') => {
	clearClassList(param_ele).classList.add('feedback-' + param_color);
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

const clearClassList = (param_ele, param_copy) => {
	document.getElementById(param_ele).classList = '';
	return document.getElementById(param_ele);
}

const toggleDisabled = (param_ele, param_disabled = false) => {
	document.getElementById(param_ele).removeAttribute('disabled');
	if (param_disabled) {
		document.getElementById(param_ele).setAttribute('disabled', param_disabled);
	}
}
const toggleDisplay = (param_ele, param_class, param_flag) => {
	if (param_flag) {
		$(param_ele).addClass(param_class);
	} else {
		$(param_ele).removeClass(param_class);
	}
}

const makeVisible = (param_ele) => {
	document.getElementById(param_ele).classList.remove('invisible');
}

const checkIfDisabled = (param_element) => {
	return document.getElementById(param_element).disabled;
}

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
}

const closeDialog = () => {
	APP_DIALOG.close();
	APP_DIALOG.textContent = '';
}

const logOut = () => {
	document.location.href = g_ROOT_PATH;
}