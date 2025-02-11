const dialogLotSelectionTemplate = () => {
	var temp_html = '';
	temp_html += `<header class="dialog-header">
					<div id="title">
						<h2>Lot Selection</h2>
				</header>
				<div class="dialog-grid dialog-grid-gap" id="dialog-login-grid">
					<div class="dialog-form-element">
						<input type="file" id="lot_file" name="lot_file" />
					</div>
					<p class="dialog-error invisible" id="dialog-login-error"></p>
				</div>`;
	return temp_html;
}

const lotFileSelected = (e) => {
	const fileChosen = e.target.files[0];
	if(!fileChosen) {
		return;
	}
	const fileExt = fileChosen.name.split(".")[1];
	const reader = new FileReader();

	if(fileExt !== g_LOT_CONFIG_EXT) {
		document.getElementById('dialog-login-error').textContent = "Unsupportted config file type.";
		feedBackColoring(document.getElementById('dialog-login-error').id, 'red');
		document.getElementById('dialog-login-error').classList.remove('invisible');
	} else {
		document.getElementById('dialog-login-error').textContent = '';
		document.getElementById('dialog-login-error').classList.add('invisible');
		feedBackColoring(document.getElementById('dialog-login-error').id);

		reader.addEventListener('load', (e) => {
			getLot(e.target.result);
		});

		reader.onerror = () => {
			document.getElementById('dialog-login-error').textContent = "Error reading the file. Please try again.";
			feedBackColoring(document.getElementById('dialog-login-error').id, 'red');
			document.getElementById('dialog-login-error').classList.remove('invisible');
		};

		reader.readAsText(fileChosen);
	}
}