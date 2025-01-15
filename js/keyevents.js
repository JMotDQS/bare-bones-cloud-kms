const setKeyEvents = (param_page, param_element, param_multiplier = 1) => {
	$('#' + param_element).on('keypress', {page: param_page, inputEl: param_element, timerMultiplier: param_multiplier}, keyPressEvent);
	$('#' + param_element).on('keyup', {page: param_page, inputEl: param_element, timerMultiplier: param_multiplier}, keyUpEvent);
}

const clearTimer = (param_timer) => {
	window.clearTimeout(param_timer); // prevent errant multiple timeouts from being generated
}

const keyPressEvent = (e) => {
	e.preventDefault;
	clearTimer(g_TIMER); // prevent errant multiple timeouts from being generated

	const myEle = document.getElementById(e.data.inputEl);
	switch(e.data.page) {
		case 'checkin':
			switch(e.data.inputEl) {
				case 'vin':
					feedBackColoring(myEle.id, 'blue');
					setElementCopy(myEle.id + '-feedback', 'Checking VIN...');
					break;

				case 'slot':
					break;
			}
			break;
	}
}
const keyUpEvent = (e) => {
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
						if (hasInput) {
							console.log("Timeout reached");
							

							getSlotAvailabilityPromise(g_CURRENT_LOT[0].pk_id, document.getElementById(e.data.inputEl).value).then((resolve) => {
								console.log("getSlotAvailability():resolve.length:", resolve.length);
								if (resolve.length > 0) {
									console.log("length > 0");
									feedBackColoring(myEle.id + '-feedback', 'red');
									setElementCopy(myEle.id + '-feedback', 'Slot is NOT available');
									feedBackColoring(myEle.id, 'red');
									setElementCopy(myEle.id, '');
									setFocus('slot');
								} else {
									console.log("length = 0");
									feedBackColoring(myEle.id + '-feedback', 'green');
									setElementCopy(myEle.id + '-feedback', 'Slot is Available.');
									feedBackColoring(myEle.id, 'green');
									toggleDisabled('slot', true);
									toggleDisabled('checkin-button', false);
									document.getElementById('checkin-button').classList.remove('button-disabled');
									makeVisible('checkin-button');
									setFocus('checkin-button');
									document.getElementById('checkin-button').addEventListener('keydown', (event) => {
										if(event.key === 'Enter' && !checkIfDisabled('checkin-button')) {
											console.log("Enter Key pressed");
										} else {
											console.log("wrong key");
										}
									});
								}
							}).catch(function(reject) {
								consoleReporting(reject);
							}).finally(function() {
								consoleReporting("Moving On.");
							});



							//const ret_value = getSlotAvailability(g_CURRENT_LOT[0].pk_id, document.getElementById(e.data.inputEl).value);
							//console.log("ret_value:", ret_value);

							/*console.log("keyUpEvent():getSlotAvailability(g_CURRENT_LOT[0].pk_id, document.getElementById(e.data.inputEl).value):", getSlotAvailability(g_CURRENT_LOT[0].pk_id, document.getElementById(e.data.inputEl).value));
							if (getSlotAvailability(g_CURRENT_LOT[0].pk_id, document.getElementById(e.data.inputEl).value)) {
								feedBackColoring(myEle.id + '-feedback', 'green');
								setElementCopy(myEle.id + '-feedback', 'Slot is Validated.');
								feedBackColoring(myEle.id, 'green');
								toggleDisabled('slot', true);
								toggleDisabled('checkin-button', false);
								makeVisible('checkin-button');*/

								/*setElementCopy(myEle.id, myEle.value);
								toggleDisabled('vin', true);
								toggleDisabled('slot', false);
								document.getElementById('container-slot').classList.remove('disable-input');
								setFocus('slot');*/
							/*} else {
								console.log("Slot unavailable");
							}*/

							/*if (cleanVIN(document.getElementById(e.data.inputEl).value)) {
								feedBackColoring(myEle.id + '-feedback', 'green');
								setElementCopy(myEle.id + '-feedback', 'Slot is Validated.');
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
							setElementCopy(myEle.id + '-feedback');*/
						}
					}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));
					break;
			}
			break;

		case 'passwordUpdate':
			g_TIMER = window.setTimeout(() => {
				var pw = document.getElementById('update_password').value;
				var pwc = document.getElementById('update_password_conf').value;

				if(pw === pwc && pw != '' && pwc != '') {
					feedBackColoring(document.getElementById('dialog-password-error').id, 'green');
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
					feedBackColoring(document.getElementById('dialog-password-error').id, 'red');
					document.getElementById('dialog-password-error').textContent = 'Passwords MUST match!';
					document.getElementById('dialog-password-error').classList.remove('invisible');
					toggleDisabled('dialog-password-update-form-button', true);
					document.getElementById('dialog-password-update-form-button').classList.add('button-disabled');
				}
			}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));
			break;
	}
}