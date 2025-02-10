const checkinTemplate = () => {
	var temp_html = '';
	temp_html += `<style>
					.card {
						text-align: start;
						cursor: default;
					}

					.button-feedback-group {
						display: flex;
						justify-content: space-between;
						align-items: center;
					}

					.flex-container-slots {
						display: flex;
						flex-wrap: wrap;
					}
					.flex-item-gap {
						margin-inline: var(--half-rem);
						margin-block-end: var(--full-rem);
						text-align: center;
					}

					.case-slot-count {
						padding: 0;
						font-weight: 700;
					}

					.under-5-slots {
						color: #ff8f8f;
					}
					.over-4-slots {
						color: #009938;
					}
				</style>
				<div class="card-template-header">
					<i id="icon" class="card-icon"></i><h2 id="title"></h2>
				</div>
				<div id="checkin-l-group">
					<div id="container-vin" class="card inset-container">
						<label for="vin">VIN:</label>
						<input id="vin" name="vin" type="text" autocomplete="off" />
						<p id="vin-feedback"></p>
					</div>

					<div id="container-slot" class="card inset-container disable-input">
						<label for="slot">Slot:</label>
						<input id="slot" name="slot" type="text" autocomplete="off" />
						<p id="slot-feedback"></p>
					</div>
					<div id="button-feedback-group" class="button-feedback-group">
						<button id="checkin-button" class="app-button invisible">Check In</button>
						<p id="checkin-feedback"></p>
					</div>
				</div>

				<div id="checkin-r-group">
					<div class="card inset-container">
						<h3>Available Slots by Case</h3>
						<div id="avail-slots" class="flex-container-slots"></div>
					</div>
				</div>`;
	return temp_html;
}

const checkInVin = () => {
	console.log("checkInVin() called");
	checkInVinPromise(document.getElementById('slot').value).then((resolve) => {
		console.log("resolve:", resolve);
		document.getElementById('checkin-feedback').textContent = `VIN ${document.getElementById('vin').value} checked in.`;
		feedBackColoring(document.getElementById('checkin-feedback').id, 'green');
		displayOpenSlots();
		clearTimer(g_TIMER);
		g_TIMER = window.setTimeout(() => {
			document.getElementById('checkin-feedback').textContent = '';
			feedBackColoring(document.getElementById('checkin-feedback').id);
			document.getElementById('vin').value = '';
			toggleDisabled('vin', false);
			setFocus('vin');
			document.getElementById('vin-feedback').textContent = '';
			feedBackColoring(document.getElementById('vin-feedback').id);

			document.getElementById('slot').value = '';
			toggleDisabled('slot', true);
			document.getElementById('slot-feedback').textContent = '';
			feedBackColoring(document.getElementById('slot-feedback').id);

			document.getElementById('checkin-button').classList.add('button-disabled');
		}, (g_TIMEOUT_VAL) * 2);
	}).catch(function(reject) {
		consoleReporting(reject);
	}).finally(function() {
		consoleReporting("Moving On.");
	});
};

const displayOpenSlots = () => {
	var countArray = [];
	var current_case = '';
	slots_open_by_case = [];
	var open_count = 0;
	var slot_count = 0;
	

	lot_slots_state.forEach((slot, index) => {
		if(slot.slot.slice(0, 3) != current_case) {
			open_count = 0;
			slot_count = 0;
			current_case = slot.slot.slice(0, 3);
			slots_open_by_case.push(
				{
					case: current_case,
					count: 0
				}
			);
		}
		slot_count++;

		if(slot.state == 1) {
			open_count++;
		}

		if(slot_count == 10) {
			countArray.push(open_count);
		}
	});

	for(i = 0; i < slots_open_by_case.length; i++) {
		slots_open_by_case[i].count = countArray[i];
	}

	var temp_html = ``;
	document.getElementById('avail-slots').innerHTML = temp_html;
	slots_open_by_case.forEach((slot, index) => {
		temp_html += `<div class="flex-item-gap">`;
			temp_html += `${slot.case}`;
			temp_html += `<p class="case-slot-count `;
			if (parseInt(slot.count) > 4) {
				temp_html += `over-4-slots">`;
			} else {
				temp_html += `under-5-slots">`;
			}
			temp_html += `(${slot.count})</p>`;
		temp_html += `</div>`;
	});
	document.getElementById('avail-slots').innerHTML = temp_html;
}