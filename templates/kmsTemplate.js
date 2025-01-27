const kmsTemplate = () => {
	var temp_html = '';
	if(g_CONNECTION) {
		g_SECTIONS.forEach((section, index) => {
			var cur_section = section.section.replaceAll(' ','').toLowerCase();
			if(index <= 1) {
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
}

const sectionClick = (data) => {
	g_CHOSEN_SECTION = parseInt(data.index);
}