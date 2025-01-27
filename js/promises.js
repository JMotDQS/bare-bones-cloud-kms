/********************************************************
	Application Promises Start
********************************************************/
const getSectionsPromise = () => {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/get_sections.php",
			type: 'POST',
			cache: false,
			dataType: 'json',

			success: function (data) {
				resolve(data);
			},

			error: function(xhr, desc, err) {
				reject(false);
				consoleReporting(xhr)
				consoleReporting("Details: " + desc + "\nError:" + err);
				consoleReporting("geSectionsPromise():Something broke");
			}
		});
	});
};

const getLotPromise = () => {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/getLot.php",
			type: 'POST',
			cache: false,
			dataType: 'json',

			success: function (data) {
				resolve(data);
			},

			error: function(xhr, desc, err) {
				reject(false);
				consoleReporting(xhr)
				consoleReporting("Details: " + desc + "\nError:" + err);
				consoleReporting("getLotPromise():Something broke");
			}
		});
	});
};

/************
	fetch("includes/getLotSlots.php", {
		method: "POST",
		body: JSON.stringify(
			{
				'lot_id': g_CURRENT_LOT.pk_id
			}
		),
		headers: {
			"Content-Type": "application/json; charset=UTF-8"
		}
	})
	.then((response) => response.json())
	.then((data) => console.log(data));
************/

const getLotSlotsPromise = () => {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/getLotSlots.php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {
				'lot_id': g_CURRENT_LOT.pk_id
			},

			success: function (data) {
				resolve(data);
			},

			error: function(xhr, desc, err) {
				reject(false);
				consoleReporting(xhr)
				consoleReporting("Details: " + desc + "\nError:" + err);
				consoleReporting("getLotSlotsPromise():Something broke");
			}
		});
	});
};
/********************************************************
	Application Promises End
********************************************************/

/********************************************************
	User Login Promises Start
********************************************************/
const userLoginCheckPromise = (param_file, param_email, param_pw) => {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/" + param_file + ".php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {
				'email_address': param_email,
				'pass': param_pw
			},

			success: function (data) {
				resolve(data);
			},

			error: function(xhr, desc, err) {
				reject(false);
				consoleReporting(xhr)
				consoleReporting("Details: " + desc + "\nError:" + err);
				consoleReporting("userLoginCheckPromise():Something broke");
			}
		});
	});
};
/********************************************************
	User Login Promises End
********************************************************/

/********************************************************
	User Update Password Promises Start
********************************************************/
const updatePasswordCheckPromise = (param_file, param_pw, param_user_id) => {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/" + param_file + ".php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {
				'newPW': param_pw,
				'userId': param_user_id
			},

			success: function (data) {
				resolve(data[0]['change_password']);
			},

			error: function(xhr, desc, err) {
				reject(false);
				consoleReporting(xhr)
				consoleReporting("Details: " + desc + "\nError:" + err);
				consoleReporting("updatePasswordCheckPromise():Something broke");
			}
		});
	});
};
/********************************************************
	User Update Password Promises End
********************************************************/

/********************************************************
	Check In Promises Start
********************************************************/
const checkInVinPromise = (param_slot) => {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/checkInVin.php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {
				'lot_id': g_CURRENT_LOT.pk_id,
				'vin': g_CURRENT_VIN,
				'key_slot': param_slot,
				'user_id': g_CURRENT_USER_ID
			},

			success: function (data) {
				setLotSlotsState(param_slot, 0);
				resolve(data);
			},

			error: function(xhr, desc, err) {
				reject(false);
				consoleReporting(xhr)
				consoleReporting("Details: " + desc + "\nError:" + err);
				consoleReporting("checkInVinPromise():Something broke");
			}
		});
	});
};
/********************************************************
	Check In Promises End
********************************************************/

/********************************************************
	Search VINs Promises Start
********************************************************/
const searchVINsPromise = (param_vin) => {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/searchVINs.php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {
				'search_vin': param_vin,
				'lot_pk_id': g_CURRENT_LOT.pk_id
			},

			success: function (data) {
				resolve(data);
			},

			error: function(xhr, desc, err) {
				reject(false);
				consoleReporting(xhr)
				consoleReporting("Details: " + desc + "\nError:" + err);
				consoleReporting("searchVINsPromise():Something broke");
			}
		});
	});
};
/********************************************************
	Search VINs Promises End
********************************************************/

/********************************************************
	Slot State Promises Start
********************************************************/
const initialLotSlotsStatePromise = () => {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/selectLotSlots.php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {
				'lot_pk_id': g_CURRENT_LOT.pk_id
			},

			success: function (data) {
				resolve(data);
			},

			error: function(xhr, desc, err) {
				reject(false);
				consoleReporting(xhr)
				consoleReporting("Details: " + desc + "\nError:" + err);
				consoleReporting("initialLotSlotsStatePromise():Something broke");
			}
		});
	});
};
/********************************************************
	Slot State Promises End
********************************************************/