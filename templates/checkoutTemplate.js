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

					#checkin-button:focus {
						border: red 4px solid;
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

					.result-card-other-lot {
						background-color:var(--color-grayout);
					}

					.result-lot-name {
						grid-column: 1/-1;
					}
				</style>
				
				<div class="card-template-header">
					<i id="icon" class="card-icon"></i><h2 id="title"></h2>
				</div>
				<div id="checkin-l-group">
					<div id="container-vin" class="card inset-container">
						<h3 for="vin">Search for VIN:</h3>
						<input id="vin" name="vin" type="text" />
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
						<button id="checkin-button" class="app-button invisible">Check In</button>
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
		cur_lot_vin_search_results.forEach((vin, index) => {
			temp_html += `<div class="result-card result-card-cur-lot" id="cur-${index}">`;
				temp_html += `<h4 class="result-lot-name">${vin.lot_name}</h4>`;
				temp_html += `<p>VIN: ${vin.vin}</p>`;
				temp_html += `<p>Slot: ${vin.key_slot}</p>`;
				temp_html += `<p>Action: ${vin.key_action}</p>`;
				temp_html += `<p>Created: ${vin.created_date.date}</p>`;
				if(vin.updated_date != null) {
					temp_html += `<p>Updated: ${vin.updated_date.date}</p>`;
				}
			temp_html += `</div>`;
		});

		temp_html += `<hr />`;

		rem_lots_vin_search_results.forEach((vin, index) => {
			temp_html += `<div class="result-card result-card-other-lot" id="oth-${index}">`;
				temp_html += `<h4 class="result-lot-name">${vin.lot_name}</h4>`;
				temp_html += `<p>VIN: ${vin.vin}</p>`;
				temp_html += `<p>Slot: ${vin.key_slot}</p>`;
				temp_html += `<p>Action: ${vin.key_action}</p>`;
				temp_html += `<p>Created: ${vin.created_date.date}</p>`;
				if(vin.updated_date != null) {
					temp_html += `<p>Updated: ${vin.updated_date.date}</p>`;
				}
			temp_html += `</div>`;
		});

		document.getElementById('result-container').innerHTML = temp_html;
		document.getElementById('result-container').classList.remove('hide-element');
		//document.getElementById('checkin-button').classList.remove('invisible');
	}
}