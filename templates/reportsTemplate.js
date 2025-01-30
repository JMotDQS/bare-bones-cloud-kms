const reportsTemplate = () => {
	var temp_html = '';
	temp_html += `<style>
					.card {
						text-align: start;
						cursor: default;
					}

					p {
						font-size: var(--three-quarter-rem);
					}

					.inset-container {
						grid-template-columns: 1fr 1fr
					}

					.title,
					.description {
						grid-column: 1/-1
					}
				</style>
				<div class="card-template-header">
					<i id="icon" class="card-icon"></i><h2 id="title"></h2>
				</div>

				<div id="checkedin-vins-reports" class="card inset-container">
					<h3 class="title">Checked In VINs Report</h3>
					<p class="description"> This report shows all VINs currently checked in and which slot they are located in. It is ordered by slot and requires no extra input.</p>
					<p class="description">Click the button below to generate the report.</p>
					<button id="vin-report-button" class="app-button" onclick="checkedInVINReport()">Generate Report</button>
					<p id="vin-report-feedback" class="description"></p>
				</div>
				<div id="container-reports" class="card inset-container">
					<h3>VIN(s) Historical Tracking Report</h3>
				</div>`;
	return temp_html;
};

const checkedInVINReport = () => {
	console.log("checkedInVINReport() called");
	checkedInVINReportPromise().then((resolve) => {
		if(resolve) {
			document.getElementById('vin-report-feedback').innerText = 'Report Created.';
			feedBackColoring(document.getElementById('vin-report-feedback').id, 'green');
		} else {
			document.getElementById('vin-report-feedback').innerText = 'Error while creating report.';
			feedBackColoring(document.getElementById('vin-report-feedback').id, 'red');
		}
		document.getElementById('vin-report-button').classList.add('disable-input', 'disable-hover', 'button-disabled');

		clearTimer(g_TIMER);
		g_TIMER = window.setTimeout(() => {
			document.getElementById('vin-report-feedback').innerText = '';
			feedBackColoring(document.getElementById('vin-report-feedback').id);
			document.getElementById('vin-report-button').classList.remove('disable-input', 'disable-hover', 'button-disabled');
		}, (g_TIMEOUT_VAL * 2));
		
	}).catch(function(reject) {
		consoleReporting(reject);
	}).finally(function() {
		consoleReporting("Moving On.");
	});
};