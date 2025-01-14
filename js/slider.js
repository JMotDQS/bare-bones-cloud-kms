const sliderSet = (param_id, param_copy) => {
	if($('#' + param_id).is(':checked')) {
		$('#active-label_' + param_id).removeClass('user-inactive');
		$('#active-label_' + param_id).html('Is ' + param_copy);
	} else {
		$('#active-label_' + param_id).addClass('user-inactive');
		$('#active-label_' + param_id).html('Not ' + param_copy);
	}
}

const sliderClicked = (e, param_copy) => {
	e.preventDefault;
	let temp_id = parseInt(e.slice(e.indexOf('_') + 1));
	let temp_field = param_copy;
	let temp_value;
	if($('#' + e).is(':checked')) {
		$('#active-label_' + e).removeClass('user-inactive');
		$('#active-label_' + e).html('Is ' + param_copy);
		temp_value = 1;

		if(param_copy == 'Admin') {
			loadDialog('addAdmin', g_DIALOG, 'dialog_add_admin', temp_id);
		} else {
			sliderUpdateRecord('sliderUpdateUser', temp_id, temp_field, temp_value);
		}
	} else {
		$('#active-label_' + e).addClass('user-inactive');
		$('#active-label_' + e).html('Not ' + param_copy);
		temp_value = 0;

		sliderUpdateRecord('sliderUpdateUser', temp_id, temp_field, temp_value);
	}
}