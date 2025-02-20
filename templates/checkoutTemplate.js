const checkoutTemplate = () => {
	var temp_html = '';
	temp_html += `<style>
					hr {
						margin-block: var(--three-quarter-rem);
					}
	
					.card {
						text-align: start;
						cursor: default;
					}

					.result-card {
					    display: grid;
						grid-template-columns: 1fr 1fr;
						border-color: #000000;
						border-style: solid;
						border-width: 1px;
						border-radius: var(--quarter-rem);
						padding: var(--quarter-rem);
						margin-block-end: var(--quarter-rem);
					}
					.result-card-cur-lot {
						background-color: var(--color-checkout-background);
						cursor: pointer;
					}
					.result-card-cur-lot:hover {
						background-color: var(--color-checkout-hover);
					}
					.result-card-cur-lot-out {
						background-color: var(--color-extra-light);
						cursor: default;
					}

					.result-card-other-lot {
						background-color:var(--color-grayout);
					}

					.result-lot-name {
						grid-column: 1/-1;
					}
					
					.checkout-result-container {
						display: grid;
						grid-template-columns: 1fr 1fr;
						column-gap: var(--full-rem);
					}
				</style>
				
				<div class="card-template-header">
					<i id="icon" class="card-icon"></i><h2 id="title"></h2>
				</div>
				<div id="checkin-l-group">
					<div id="container-vin" class="card inset-container">
						<h3 for="vin">Search for VIN:</h3>
						<input id="vin" name="vin" type="text" autocomplete="off" />
						<p id="vin-feedback"></p>
						<div id="button-group" class="button-group">
							<button id="clear-button" class="app-button">Clear</button>
							<button id="search-button" class="app-button" onclick="searchVINs(this.value)">Search</button>
						</div>
					</div>

					<div id="container-results" class="card inset-container">
						<h3>Results:</h3>
						<div id="result-container" class="hide-element"></div>
					</div>
				</div>

				<div id="checkin-r-group">
					<div class="card inset-container">
						<h3>Confirm Check Out</h3>
						<div id="checkout-result-container" class="hide-element">
							<input id="slot_pk_id" name="slot_pk_id" type="hidden" autocomplete="off" />
							<input id="vin_pk_id" name="vin_pk_id" type="hidden" autocomplete="off" />

							<div class="inset-container">
								<label for="vinChosen">VIN:</label>
								<input id="vinChosen" name="vin" class="disable-input" type="text" autocomplete="off" />
							</div>

							<div class="inset-container">
								<label for="slot">SLot:</label>
								<input id="slot" name="slot" class="disable-input" type="text" autocomplete="off" />
							</div>

							<div class="inset-container">
								<label for="vinConfirm">Confirm VIN:</label>
								<input id="vinConfirm" name="vinConfirm" type="text" autocomplete="off" />
							</div>

							<p id="confirm-feedback"></p>
						</div>
						<button id="checkout-button" class="app-button disable-input disable-hover button-disabled hide-element" onclick="checkoutVIN()">Check Out</button>
					</div>
				</div>`;

	return temp_html;
}

const setCheckoutSearchResults = () => {
	if(bulk_vin_search_results.reg_error != "") {
		document.getElementById('vin-feedback').innerHTML = `${bulk_vin_search_results.reg_error}`;
		feedBackColoring(document.getElementById('vin-feedback').id, 'red');
	} else {
		var temp_html = '';
		if(cur_lot_vin_search_results.length < 1) {
			temp_html += `${g_CURRENT_LOT.Name} has no matching results.`;
		} else {
			cur_lot_vin_search_results.forEach((vin, index) => {
				if(vin.KeyAction == 'In') {
					temp_html += `<div class="result-card result-card-cur-lot" id="cur-${index}" data-index="${index}" onclick="checkoutChosenVIN(this)">`;
				} else {
					temp_html += `<div class="result-card result-card-cur-lot-out" id="cur-${index}" data-index="${index}">`;
				}
					temp_html += `<h4 class="result-lot-name">${vin.CompanyLocationName}</h4>`;
					temp_html += `<p>VIN: ${vin.Vin}</p>`;
					temp_html += `<p>Slot: ${vin.KeySlot}</p>`;
					temp_html += `<p>Action: ${vin.KeyAction}</p>`;
					temp_html += `<p>Created: ${vin.Created.date}</p>`;
					if(vin.Updated != null) {
						temp_html += `<p>Updated: ${vin.Updated.date}</p>`;
					}
				temp_html += `</div>`;
			});
		}

		temp_html += `<hr />`;

		if(rem_lots_vin_search_results < 1) {
			temp_html += `No other lots have matching results.`;
		} else {
			rem_lots_vin_search_results.forEach((vin, index) => {
				temp_html += `<div class="result-card result-card-other-lot" id="oth-${index}">`;
					temp_html += `<h4 class="result-lot-name">${vin.CompanyLocationName}</h4>`;
					temp_html += `<p>VIN: ${vin.Vin}</p>`;
					temp_html += `<p>Slot: ${vin.KeySlot}</p>`;
					temp_html += `<p>Action: ${vin.KeyAction}</p>`;
					temp_html += `<p>Created: ${vin.Created.date}</p>`;
					if(vin.Updated != null) {
						temp_html += `<p>Updated: ${vin.Updated.date}</p>`;
					}
				temp_html += `</div>`;
			});
		}

		document.getElementById('result-container').innerHTML = temp_html;
		document.getElementById('result-container').classList.remove('hide-element');
	}
}

const checkoutChosenVIN = (ele) => {
	document.getElementById('vinConfirm').value = '';
	document.getElementById('vin_pk_id').value = cur_lot_vin_search_results[ele.dataset.index].CompanyLocationId;
	document.getElementById('slot_pk_id').value = cur_lot_vin_search_results[ele.dataset.index].KeySlotId;
	document.getElementById('vinChosen').value = cur_lot_vin_search_results[ele.dataset.index].Vin;
	document.getElementById('vinChosen').setAttribute('disabled', true);
	document.getElementById('slot').value = cur_lot_vin_search_results[ele.dataset.index].KeySlot;
	document.getElementById('slot').setAttribute('disabled', true);
	document.getElementById('checkout-result-container').classList.remove('hide-element');
	document.getElementById('checkout-result-container').classList.add('checkout-result-container');
	document.getElementById('checkout-button').classList.remove('hide-element');
	setFocus('vinConfirm');
	setKeyEvents('checkout', 'vinConfirm', .5);
}

const checkoutVIN = () => {
	checkoutVINPromise(document.getElementById('slot').value).then((resolve) => {
		// stuff
		console.log("resolve[0]:", resolve[0]);
		if(resolve[0]) {
			toggleDisabled('checkout-button', true);
			document.getElementById('checkout-button').classList.add('button-disabled');
			document.getElementById('checkout-button').classList.add('disable-input');
			document.getElementById('checkout-button').classList.add('disable-hover');

			document.getElementById('confirm-feedback').innerText = 'VIN successfully checked out.';
			feedBackColoring(document.getElementById('confirm-feedback').id, 'green');
			clearTimer(g_TIMER);
			g_TIMER = window.setTimeout(() => {
				resetTemplate();
			}, (g_TIMEOUT_VAL * 2));
		} else {
			document.getElementById('confirm-feedback').innerText = 'Error checking out VIN.';
			feedBackColoring(document.getElementById('confirm-feedback').id, 'red');
		}
	}).catch(function(reject) {
		consoleReporting(reject);
	}).finally(function() {
		consoleReporting("Moving On.");
	});
};

const resetTemplate = () => {
	toggleDisabled('vin', false);
	document.getElementById('vin').value = '';
	toggleDisabled('search-button', true);
	setFocus('vin');
	document.getElementById('search-button').classList.add('button-disabled');
	document.getElementById('result-container').innerHTML = '';

	document.getElementById('vin-feedback').innerHTML = '';
	feedBackColoring(document.getElementById('vin-feedback').id);

	document.getElementById('checkout-result-container').classList.add('hide-element');
	document.getElementById('checkout-result-container').classList.remove('checkout-result-container');
	document.getElementById('checkout-button').classList.add('hide-element');
	document.getElementById('confirm-feedback').innerText = '';
	feedBackColoring(document.getElementById('confirm-feedback').id);
};