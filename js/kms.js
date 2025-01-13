function setIndexContent() {
	var temp_html = '';
	if(g_CONNECTION) {
		g_SECTIONS.forEach((section, index) => {
			var cur_section = section.section.replaceAll(' ','').toLowerCase();
			temp_html += `<div id="${section.pk_id}" class="card ${'card-' + cur_section}" data-page="${cur_section}" data-index="${index}" onclick="sectionClick(this.dataset)">`;
				temp_html += `<h1>${section.section}</h1>`;
				temp_html += `<p class="card-body">${section.body_copy}</p>`;
				temp_html += `<p class="card-icon"><i class="${section.icon}"></i></p>`;
			temp_html += `</div>`;
		});
	} else {
		temp_html = `<h2>${g_CONNECTION_ERROR_COPY}</h2>`;
	}
	document.getElementById("card-template-container").innerHTML = temp_html;
	makeVisible('card-template-container');
}

function sectionClick(data) {
	g_CHOSEN_SECTION = parseInt(data.index);
	console.log("g_CHOSEN_SECTION:", g_CHOSEN_SECTION);
	loadPage(data.page);
}