const checkinTemplate = () => {
	var temp_html = '';
	temp_html += `<style>
					.card {
						text-align: start;
						cursor: default;
					}

					#checkin-button:focus {
						border: red 4px solid;
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
					<button id="checkin-button" class="app-button invisible">Check In</button>
				</div>

				<div id="checkin-r-group">
					<div class="card inset-container">
						<h3>Available Slots by Case</h3>
					</div>
				</div>`;
	return temp_html;
}

const checkInVin = () => {
	g_FUNC_CALL_CNT += 1;

	if (g_FUNC_CALL_CNT == 1) {
		g_FUNC_CALL_CNT = 0;
		checkInVinPromise(document.getElementById('slot').value).then((resolve) => {
			//
			console.log("resolve:", resolve);
		}).catch(function(reject) {
			consoleReporting(reject);
		}).finally(function() {
			consoleReporting("Moving On.");
		});
	}
	/*checkInVinPromise(document.getElementById('slot').value).then((resolve) => {
		//
		console.log("resolve:", resolve);
	}).catch(function(reject) {
		consoleReporting(reject);
	}).finally(function() {
		consoleReporting("Moving On.");
	});*/
};