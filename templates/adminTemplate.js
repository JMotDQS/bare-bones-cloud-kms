const adminTemplate = () => {
	var temp_html = '';
	temp_html += `<style>
					.card {
						text-align: start;
						cursor: default;
					}

					.button-feedback-group {
						display: flex;
						justify-content: space-between;
						align-items: center;
					}

					.flex-container-slots {
						display: flex;
						flex-wrap: wrap;
					}
					.flex-item-gap {
						margin-inline: var(--half-rem);
						margin-block-end: var(--full-rem);
						text-align: center;
					}

					p {
						font-size: var(--three-quarter-rem);
					}
					.case-slot-count {
						padding: 0;
						font-weight: 700;
					}

					.under-5-slots {
						color: #ff8f8f;
					}
					.over-4-slots {
						color: #009938;
					}
				</style>
				<div class="card-template-header">
					<i id="icon" class="card-icon"></i><h2 id="title"></h2>
				</div>
				<div id="checkin-l-group">
					<div id="container-vin" class="card inset-container">
						<label for="vin">VIN:</label>
						<input id="vin" name="vin" type="text" autocomplete="off" />
						<p id="vin-feedback"></p>
					</div>

					<div id="container-slot" class="card inset-container disable-input">
						<label for="slot">Slot:</label>
						<input id="slot" name="slot" type="text" autocomplete="off" />
						<p id="slot-feedback"></p>
					</div>
					<div id="button-feedback-group" class="button-feedback-group">
						<button id="checkin-button" class="app-button invisible">Check In</button>
						<p id="checkin-feedback"></p>
					</div>
				</div>

				<div id="checkin-r-group">
					<div class="card inset-container">
						<h3>Available Slots by Case</h3>
						<div id="avail-slots" class="flex-container-slots"></div>
					</div>
				</div>`;
	return temp_html;
}