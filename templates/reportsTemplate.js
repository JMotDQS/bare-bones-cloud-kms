const reportsTemplate = () => {
	var temp_html = '';
	temp_html += `<style>
					.card {
						text-align: start;
						cursor: default;
					}

					.sub-card {
					    display: grid;
						grid-template-columns: 1fr 1fr;
						border-color: #000000;
						border-style: solid;
						border-width: 1px;
						border-radius: var(--quarter-rem);
						padding: var(--quarter-rem);
						margin-block-end: var(--quarter-rem);
					}
					.sub-card-cur-lot {
						background-color: var(--color-reports-background);
					}

					button {
						height: calc(var(--full-rem) * 2.25);
					}

					p {
						font-size: var(--three-quarter-rem);
					}
					.feedback-style {
						font-size: var(--full-rem);
					}

					.report-inset-container {
						grid-template-columns: 1fr 1fr;
						align-items: center;
					}
					.input-inset-container {
						gap: var(--quarter-rem);
					}

					.title,
					.full-width-ele {
						grid-column: 1/-1
					}

					#scan-count {
						text-align: end;
					}
				</style>
				<div class="card-template-header">
					<i id="icon" class="card-icon"></i><h2 id="title"></h2>
				</div>

				<div id="checkedin-vins-reports" class="card inset-container report-inset-container">
					<h3 class="title">Checked In VINs Report</h3>
					<p class="full-width-ele"> This report shows all VINs currently checked in and which slot they are located in. It is ordered by slot and requires no extra input.</p>
					<p class="full-width-ele">Click the button below to generate the report.</p>
					<button id="vin-report-button" class="app-button" onclick="checkedInVINReport()">Generate Report</button>
					<p class="feedback-style" id="vin-report-feedback"></p>
				</div>
				<div id="physical-vins-reports" class="card inset-container report-inset-container">
					<h3>VIN(s) Physical Inventory Report</h3>
					<p id="scan-count">4 VIN(s) scanned</p>
					<!--<h3 class="title">VIN(s) Physical Inventory Report</h3>-->
					<!--<p class="full-width-ele" id="scan-count">4 VIN(s) scanned</p>-->
					<div id="container-vin" class="inset-container input-inset-container full-width-ele">
						<label for="vin">VIN:</label>
						<input id="vin" name="vin" type="text" />
						<p id="vin-feedback"></p>
					</div>
					<div id="vin-scanned-list-container" class="full-width-ele">
						<div class="sub-card sub-card-cur-lot">
							<p>VIN:</p>
							<p>Slot:</p>
							<h4 class="full-width-ele">${g_CURRENT_LOT.lot_name}</h4>
						</div>
					</div>
					<!--<textarea class="full-width-ele" id="vin-inventory" name="vin-inventory" rows="5" cols="50"></textarea>-->
					<button id="vin-physical-report-button" class="app-button" onclick="physicalVINReport()">Generate Report</button>
					<p id="vin-physical-report-feedback"></p>
				</div>
				<div id="historical-vins-reports" class="card inset-container report-inset-container">
					<h3 class="title">VIN(s) Historical Tracking Report</h3>
					<textarea class="full-width-ele" id="vin-list" name="vin-list" rows="5" cols="50"></textarea>
					<button id="vin-historical-report-button" class="app-button" onclick="historicalVINReport()">Generate Report</button>
					<p id="vin-historical-report-feedback"></p>
				</div>`;
	return temp_html;
};

const checkedInVINReport = () => {
	console.log("checkedInVINReport() called");
	checkedInVINReportPromise().then((resolve) => {
		if(resolve) {
			document.getElementById('vin-report-feedback').innerText = 'Report Created.';
			feedBackColoring(document.getElementById('vin-report-feedback').id, 'green');
			document.getElementById('vin-report-feedback').classList.add('feedback-style');
		} else {
			document.getElementById('vin-report-feedback').innerText = 'Error while creating report.';
			feedBackColoring(document.getElementById('vin-report-feedback').id, 'red');
			document.getElementById('vin-report-feedback').classList.add('feedback-style');
		}
		document.getElementById('vin-report-button').classList.add('disable-input', 'disable-hover', 'button-disabled');

		clearTimer(g_TIMER);
		g_TIMER = window.setTimeout(() => {
			document.getElementById('vin-report-feedback').innerText = '';
			feedBackColoring(document.getElementById('vin-report-feedback').id);
			document.getElementById('vin-report-feedback').classList.add('feedback-style');
			document.getElementById('vin-report-button').classList.remove('disable-input', 'disable-hover', 'button-disabled');
		}, (g_TIMEOUT_VAL * 2));
		
	}).catch(function(reject) {
		consoleReporting(reject);
	}).finally(function() {
		consoleReporting("Moving On.");
	});
};

const historicalVINReport = () => {

};