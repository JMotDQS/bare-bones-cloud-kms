const kmsTemplate = () => {
	var temp_html = '';
	if(g_SECTIONS.length > 0) {
		g_SECTIONS.forEach((section, index) => {
			var cur_section = section.Name.replaceAll(' ','').toLowerCase();
			
			temp_html += `<div id="${section.KmsSectionId}" class="card ${'card-' + cur_section}" data-page="${cur_section}" data-index="${index}" onclick="loadTemplate(this.dataset)">`;
				temp_html += `<h1>${section.Name}</h1>`;
				temp_html += `<p class="card-body">${section.BodyCopy}</p>`;
				temp_html += `<p class="card-icon"><i class="${section.Icon}"></i></p>`;
			temp_html += `</div>`;
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
		g_SECTIONS = resolve;
	}).catch(function(reject) {
		consoleReporting(reject);
	}).finally(function() {
		consoleReporting("Moving On.");
	});
};

const sectionClick = (data) => {
	g_CHOSEN_SECTION = parseInt(data.index);
};