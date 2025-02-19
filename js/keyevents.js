const setKeyEvents = (param_page, param_element, param_multiplier = 1) => {
	$('#' + param_element).on('keydown', {page: param_page, inputEl: param_element, timerMultiplier: param_multiplier}, keyDownEvent);
	$('#' + param_element).on('keyup', {page: param_page, inputEl: param_element, timerMultiplier: param_multiplier}, keyUpEvent);
};

const clearTimer = (param_timer) => {
	window.clearTimeout(param_timer); // prevent errant multiple timeouts from being generated
};

const keyDownEvent = (e) => {
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
};
const keyUpEvent = (e) => {
	e.preventDefault;
	clearTimer(g_TIMER); // prevent errant multiple timeouts from being generated
	const hasInput = document.getElementById(e.data.inputEl).value != '';
	const myEle = document.getElementById(e.data.inputEl);
	switch(e.data.page) {
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
							if (document.getElementById(e.data.inputEl).value.length > 3) {
								if( parseInt(lot_slots_state.filter(slot => slot.KeySlot === document.getElementById(e.data.inputEl).value.toUpperCase())[0].state) == 1 ) {
									// Slot is open
									feedBackColoring(myEle.id + '-feedback', 'green');
									setElementCopy(myEle.id + '-feedback', 'Slot is Available.');
									feedBackColoring(myEle.id, 'green');
									toggleDisabled('slot', true);
									toggleDisabled('checkin-button', false);
									document.getElementById('checkin-button').classList.remove('button-disabled');
									makeVisible('checkin-button');
								} else {
									// Slot is closed
									feedBackColoring(myEle.id + '-feedback', 'red');
									setElementCopy(myEle.id + '-feedback', 'Slot is NOT available');
									feedBackColoring(myEle.id, 'red');
									setElementCopy(myEle.id, '');
									setFocus('slot');
								}
							}
						}
					}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));
					break;
			}
			break;

		case 'checkout':
			switch(e.data.inputEl) {
				case 'vin':
					if(document.getElementById('vin').value.length > 0) {
						toggleDisabled('search-button', false);
						document.getElementById('search-button').classList.remove('button-disabled');
					} else {
						toggleDisabled('search-button', true);
						document.getElementById('search-button').classList.add('button-disabled');
					}
					break;

				case 'slot':
					break;
				
				case 'vinConfirm':
					if(document.getElementById('vinConfirm').value == document.getElementById('vinChosen').value) {
						toggleDisabled('checkout-button', false);
						document.getElementById('checkout-button').classList.remove('button-disabled');
						document.getElementById('checkout-button').classList.remove('disable-input');
						document.getElementById('checkout-button').classList.remove('disable-hover');
						document.getElementById('confirm-feedback').innerText = 'VINs match.';
						feedBackColoring(document.getElementById('confirm-feedback').id, 'green');
					} else {
						toggleDisabled('checkout-button', true);
						document.getElementById('checkout-button').classList.add('button-disabled');
						document.getElementById('checkout-button').classList.add('disable-input');
						document.getElementById('checkout-button').classList.add('disable-hover');
						document.getElementById('confirm-feedback').innerText = 'Scanned VIN does not match.';
						feedBackColoring(document.getElementById('confirm-feedback').id, 'red');
					}
					break;
			}
			break;

			case 'reports':
				g_TIMER = window.setTimeout(() => {
					if (hasInput) {
						if (cleanVIN(document.getElementById(e.data.inputEl).value)) {
							addVINToPhysInvList(cleanVIN(document.getElementById('vin').value));
						}
					}
				}, (g_TIMEOUT_VAL));
				break;
	}
};