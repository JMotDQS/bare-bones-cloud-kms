const checkoutTemplate = () => {
	var temp_html = '';
	temp_html += `<style>
					.card {
						text-align: start;
						cursor: default;
					}

					#checkin-button:focus {
						border: red 4px solid;
					}

					.result-card {
					    display: grid;
						grid-template-columns: 1fr 1fr;
						border-color: #000000;
						border-style: solid;
						border-width: 1px;
						border-radius: 4px;
						padding: 4px;
						background-color: #ff9900;
					}
				</style>
				
				<div class="card-template-header">
					<i id="icon" class="card-icon"></i><h2 id="title"></h2>
				</div>
				<div id="checkin-l-group">
					<div id="container-vin" class="card inset-container">
						<label for="vin">Search for VIN:</label>
						<input id="vin" name="vin" type="text" />
						<p id="vin-feedback"></p>
						<div id="button-group" class="button-group">
							<button id="clear-button" class="app-button">Clear</button>
							<button id="search-button" class="app-button" onclick="searchVINs(this.value)">Search</button>
						</div>
					</div>

					<div id="container-results" class="card inset-container disable-input">
						<label>Results:</label>
						<div class="result-card">
							<!--<p id="results-feedback">Feedback on search results goes here</p>-->
							<p>VIN: 1234567895425865214587</p>
							<p>Slot: 001A</p>
							<p>Date/Time: 2025-01-27 : 12:48</p>
							<p>Action: In</p>
						</div>
						<!--<input id="results" name="results" type="text" />-->
					</div>
					<button id="checkin-button" class="app-button invisible">Check In</button>
				</div>

				<div id="checkin-r-group">
					<div class="card inset-container">
						<h3>Confirm Check Out</h3>
					</div>
				</div>`;
	return temp_html;
}