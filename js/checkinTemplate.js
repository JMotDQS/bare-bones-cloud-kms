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
				</style>
				<div class="card-template-header">
					<i id="icon" class="card-icon"></i><h2 id="title"></h2>
				</div>
				<div id="checkin-l-group">
					<div id="container-vin" class="card inset-container">
						<label for="vin">VIN:</label>
						<input id="vin" name="vin" type="text" />
						<p id="vin-feedback"></p>
					</div>

					<div id="container-slot" class="card inset-container disable-input">
						<label for="slot">Slot:</label>
						<input id="slot" name="slot" type="text" />
						<p id="slot-feedback"></p>
					</div>
					<div id="button-feedback-group" class="button-feedback-group">
						<button id="checkin-button" class="app-button invisible">Check In</button>
						<p id="checkin-feedback">Test feedback</p>
					</div>
				</div>

				<div id="checkin-r-group">
					<div class="card inset-container">
						<h3>Available Slots by Case</h3>
					</div>
				</div>`;
	return temp_html;
}

const checkInVin = () => {
	console.log("checkInVin() called");
	g_FUNC_CALL_CNT += 1;

	if (g_FUNC_CALL_CNT == 1) {
		g_FUNC_CALL_CNT = 0;
		checkInVinPromise(document.getElementById('slot').value).then((resolve) => {
			console.log("resolve:", resolve);
			document.getElementById('checkin-feedback').textContent = `VIN ${document.getElementById('vin').value} checked in.`;
			feedBackColoring(document.getElementById('checkin-feedback').id, 'green');
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
	}
};