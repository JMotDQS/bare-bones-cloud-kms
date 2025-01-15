const checkinTemplate = () => {
	var temp_html = '';
	temp_html += `<style>
					.card {
						text-align: start;
						cursor: default;
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
					<div id="checkin-button-container">
						<button id="checkin-button" class="app-button invisible">Check In</button>
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
	checkInVinPromise(document.getElementById('slot').value).then((resolve) => {
		/*g_SECTIONS = [];
		g_SECTIONS = resolve['sections'];
		g_CONNECTION = resolve['conn'];*/
		console.log("resolve:", resolve);
	}).catch(function(reject) {
		consoleReporting(reject);
	}).finally(function() {
		consoleReporting("Moving On.");
	});
}