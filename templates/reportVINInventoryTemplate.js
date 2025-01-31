const reportVINInventoryTemplate = () => {
	var temp_html = `<div id="checkedin-vins-reports" class="card inset-container report-inset-container">
					<h3 class="title">Checked In VINs Report</h3>
					<div id="vin-inventory-body" class="full-width-ele">
						<p> This report shows all VINs currently checked in and which slot they are located in. It is ordered by slot and requires no extra input.</p>
						<br />
						<p>Click the button below to generate the report.</p>
					</div>
					<button id="vin-report-button" class="app-button" onclick="checkedInVINReport()">Generate Report</button>
					<p class="feedback-style" id="vin-report-feedback"></p>
				</div>`;
	return temp_html;
}