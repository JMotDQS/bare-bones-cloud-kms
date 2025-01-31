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

					textarea {
						width: 100%;
					}

					p {
						font-size: var(--three-quarter-rem);
					}
					.feedback-style {
						font-size: var(--full-rem);
					}

					.report-inset-container {
						grid-template-columns: 1fr 1fr;
						align-content: space-between;
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

				${reportVINInventoryTemplate()}
				${reportPhysicalInventoryTemplate()}
				${reportHistoricalInventoryTemplate()}`;
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