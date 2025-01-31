const reportHistoricalInventoryTemplate = () => {
	temp_html = `<div id="historical-vins-reports" class="card inset-container report-inset-container">
					<h3 class="title">VIN(s) Historical Tracking Report</h3>
					<div id="vin-his-inventory-body" class="full-width-ele">
						<textarea id="vin-list" name="vin-list" rows="5"></textarea>
					</div>
					<button id="vin-historical-report-button" class="app-button" onclick="historicalVINReport()">Generate Report</button>
					<p id="vin-historical-report-feedback"></p>
				</div>`;
	return temp_html;
}