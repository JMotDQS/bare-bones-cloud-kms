const kmsTemplate = () => {
	var temp_html = '';
	if(g_CONNECTION) {
		g_SECTIONS.forEach((section, index) => {
			var cur_section = section.section.replaceAll(' ','').toLowerCase();
			/*******
				index[0] = Check In
					display_order = 1
				index[1] = Check Out
					display_order = 2
				index[2] = Reports
					display_order = 3
				index[3] = Dashboard
					display_order = 4
				index[4] = Admin
					display_order = 5
				index[5] = Labels
					display_order = 6
				index[6] = Search
					display_order = 11
			*******/
			if(index < 3) {
				temp_html += `<div id="${section.pk_id}" class="card ${'card-' + cur_section}" data-page="${cur_section}" data-index="${index}" onclick="loadTemplate(this.dataset)">`;
					temp_html += `<h1>${section.section}</h1>`;
					temp_html += `<p class="card-body">${section.body_copy}</p>`;
					temp_html += `<p class="card-icon"><i class="${section.icon}"></i></p>`;
				temp_html += `</div>`;
			}
		});
	} else {
		temp_html = `<h2>${g_CONNECTION_ERROR_COPY}</h2>`;
	}

	makeVisible('card-template-container');
	return temp_html;
};

const getSections = () => {
	getSectionsPromise().then((resolve) => {
		g_SECTIONS = [];
		g_SECTIONS = resolve['sections'];
		g_CONNECTION = resolve['conn'];
	}).catch(function(reject) {
		consoleReporting(reject);
	}).finally(function() {
		consoleReporting("Moving On.");
	});
};

const sectionClick = (data) => {
	g_CHOSEN_SECTION = parseInt(data.index);
};