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
}

const getLotsPromise = () => {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/getLots.php",
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
				consoleReporting("getLotsPromise():Something broke");
			}
		});
	});
}
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
}
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
}
/********************************************************
	User Update Password Promises End
********************************************************/

/********************************************************
	Check In Promises Start
********************************************************/
const getSlotAvailabilityPromise = (param_lot, param_slot) => {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/getSlotAvailability.php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {
				'lot_id': param_lot,
				'key_slot': param_slot
			},

			success: function (data) {
				console.log("data:", data);
				console.log("data.length:", data.length);
				resolve(data);
			},

			error: function(xhr, desc, err) {
				reject(false);
				consoleReporting(xhr)
				consoleReporting("Details: " + desc + "\nError:" + err);
				consoleReporting("getSlotAvailabilityPromise():Something broke");
			}
		});
	});
}

const checkInVinPromise = (param_slot) => {
	console.log("checkInVinPromise() called");
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/checkInVin.php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {
				'lot_id': g_CURRENT_LOT[0].pk_id,
				'vin': g_CURRENT_VIN,
				'key_slot': param_slot,
				'user_id': g_CURRENT_USER_ID
			},

			success: function (data) {
				console.log("data:", data);
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
}
/********************************************************
	Check In Promises End
********************************************************/