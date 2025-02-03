const reportPhysicalInventoryTemplate = () => {
	physical_inv_array = [];
	temp_html = `<div id="physical-vins-reports" class="card inset-container report-inset-container">
					<h3>VIN(s) Physical Inv. Audit Report</h3>
					<p id="scan-count">VINs scanned: 0</p>
					<div id="vin-phys-inventory-body" class="full-width-ele">
						<div id="container-vin" class="inset-container input-inset-container full-width-ele">
							<label for="vin">VIN:</label>
							<input id="vin" name="vin" type="text" />
							<p id="vin-feedback"></p>
						</div>
						<div id="vin-scanned-list-container"></div>
					</div>
					<button id="vin-physical-report-button" class="app-button" onclick="physicalVINReport()">Generate Report</button>
					<p id="vin-physical-report-feedback"></p>
				</div>`;
	return temp_html;
}