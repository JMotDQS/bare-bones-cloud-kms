const reportPhysicalInventoryTemplate = () => {
	temp_html = `<div id="physical-vins-reports" class="card inset-container report-inset-container">
					<h3>VIN(s) Physical Inventory Audit Report</h3>
					<p id="scan-count">4 VIN(s) scanned</p>
					<div id="vin-phys-inventory-body" class="full-width-ele">
						<div id="container-vin" class="inset-container input-inset-container full-width-ele">
							<label for="vin">VIN:</label>
							<input id="vin" name="vin" type="text" />
							<p id="vin-feedback"></p>
						</div>
						<div id="vin-scanned-list-container">
							<div class="sub-card sub-card-cur-lot">
								<p>VIN:</p>
								<p>Slot:</p>
								<h4>${g_CURRENT_LOT.lot_name}</h4>
							</div>
						</div>
					</div>
					<button id="vin-physical-report-button" class="app-button" onclick="physicalVINReport()">Generate Report</button>
					<p id="vin-physical-report-feedback"></p>
				</div>`;
	return temp_html;
}