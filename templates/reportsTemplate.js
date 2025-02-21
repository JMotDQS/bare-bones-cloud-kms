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
	let rawVINList = document.getElementById('vin-list').value;
	let cleanVINList = rawVINList.replace(/\s/g,'');
	let completedVINList = cleanVINList.replace(/,/g, "','");
	completedVINList = "'" + completedVINList + "'";

	historicalVINReportPromise(completedVINList).then(function(resolve) {
		if(resolve) {
			document.getElementById('vin-historical-report-feedback').innerText = 'Report Created.';
			feedBackColoring(document.getElementById('vin-historical-report-feedback').id, 'green');
			document.getElementById('vin-historical-report-feedback').classList.add('feedback-style');
			document.getElementById('vin-list').value = '';
		} else {
			document.getElementById('vin-historical-report-feedback').innerText = 'Error while creating report.';
			feedBackColoring(document.getElementById('vin-historical-report-feedback').id, 'red');
			document.getElementById('vin-historical-report-feedback').classList.add('feedback-style');
		}
		document.getElementById('vin-historical-report-button').classList.add('disable-input', 'disable-hover', 'button-disabled');

		clearTimer(g_TIMER);
		g_TIMER = window.setTimeout(() => {
			document.getElementById('vin-historical-report-feedback').innerText = '';
			feedBackColoring(document.getElementById('vin-historical-report-feedback').id);
			document.getElementById('vin-historical-report-feedback').classList.add('feedback-style');
			document.getElementById('vin-historical-report-button').classList.remove('disable-input', 'disable-hover', 'button-disabled');
		}, (g_TIMEOUT_VAL * 2));
	}).catch(function(reject) {
		alert("Audit Failed");
	}).finally(function() {

	})
};

const addVINToPhysInvList = (param_vin) => {
	searchVINsPromise(param_vin).then((resolve) => {
		if(resolve.reg_error != "") {
			document.getElementById('vin-physical-report-feedback').innerText = `VIN: ${param_vin} not found in system.`;
			feedBackColoring(document.getElementById('vin-physical-report-feedback').id, 'red');
			document.getElementById('vin-physical-report-feedback').classList.add('feedback-style');
		} else {
			if(physical_inv_array.find(item => item.vin === param_vin) == undefined) {
				document.getElementById('vin-physical-report-feedback').innerText = '';
				feedBackColoring(document.getElementById('vin-physical-report-feedback').id);
				document.getElementById('vin-physical-report-feedback').classList.add('feedback-style');

				physical_inv_array.unshift(resolve['vins'][0]);
				if(physical_inv_array.length < 1) {
					toggleDisabled('vin-physical-report-button', true);
					document.getElementById('vin-physical-report-button').classList.add('button-disabled');
				} else {
					toggleDisabled('vin-physical-report-button');
					document.getElementById('vin-physical-report-button').classList.remove('button-disabled');
				}
				var temp_html = ``;

				physical_inv_array.forEach((item, index) => {
					temp_html += `<div class="sub-card sub-card-cur-lot">
									<p>VIN:${item.Vin}</p>
									<p>Slot:${item.KeySlot}</p>
									<h4 class="full-width-ele">${item.CompanyLocationName}</h4>
								</div>`;
				});
				document.getElementById('vin-scanned-list-container').innerHTML = temp_html;
			} else {
				document.getElementById('vin-physical-report-feedback').innerText = `VIN: ${param_vin} has already been scanned.`;
				feedBackColoring(document.getElementById('vin-physical-report-feedback').id, 'red');
				document.getElementById('vin-physical-report-feedback').classList.add('feedback-style');
			}
			document.getElementById('scan-count').innerText = `VINs scanned: ${physical_inv_array.length}`;

		}
		document.getElementById('vin').value = '';
		setFocus('vin');
	}).catch(function(reject) {
		consoleReporting(reject);
	}).finally(function() {
		consoleReporting("Moving On.");
	});
};

const physicalVINReport = () => {
	physicalVINReportPromise().then((resolve) => {
		if(resolve) {
			document.getElementById('vin-physical-report-feedback').innerText = 'Report Created.';
			feedBackColoring(document.getElementById('vin-physical-report-feedback').id, 'green');
			document.getElementById('vin-physical-report-feedback').classList.add('feedback-style');
		} else {
			document.getElementById('vin-physical-report-feedback').innerText = 'Error while creating report.';
			feedBackColoring(document.getElementById('vin-physical-report-feedback').id, 'red');
			document.getElementById('vin-physical-report-feedback').classList.add('feedback-style');
		}

		document.getElementById('vin-scanned-list-container').innerHTML = '';

		clearTimer(g_TIMER);
		g_TIMER = window.setTimeout(() => {
			document.getElementById('vin-physical-report-feedback').innerText = '';
			feedBackColoring(document.getElementById('vin-physical-report-feedback').id);
			document.getElementById('vin-physical-report-feedback').classList.add('feedback-style');
			document.getElementById('vin-physical-report-button').classList.remove('disable-input', 'disable-hover', 'button-disabled');
		}, (g_TIMEOUT_VAL * 2));
	}).catch(function(reject) {
		consoleReporting(reject);
	}).finally(function() {
		consoleReporting("Moving On.");
	});
};