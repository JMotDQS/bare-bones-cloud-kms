/*const navClick = (data) => {
	console.log("data:", data);
	console.log("data.target:", data.target);
	console.log("data.dataset.route:", data.dataset.route);

	window.history.pushState({}, "", data.dataset.route);
	urlLocationHandler(data.dataset.route);
}

const cardClick = (data) => {
	console.log("data.dataset.route:", data.dataset.route);
}*/

/*window.addEventListener('popstate', () => {
	console.log("Navigation:window.location.pathname:", window.location.pathname);
	var tempArr = window.location.pathname.split("/");
	console.log(window.location.pathname.split("/"));
	if(tempArr[2].length > 0) {
		console.log(tempArr[2]);
	} else {
		tempArr[2] = "/";
		console.log("Root directory");
	}
	urlLocationHandler(tempArr[2]);
})*/

const urlChangeEvent = new CustomEvent('urlChange', {
	detail: {
		loc: "",
	}
});
window.addEventListener('urlChange', function(e) {
	console.log("e.detail.loc:", e.detail.loc);
	//var location = window.location.pathname;
	if(e.detail.loc.length == 1) {
		//location = "/cloud-kms/";
		window.history.pushState({}, "", "/cloud-kms/");
	} else {
		window.history.pushState({}, "", e.detail.loc);
	}
	console.log("urlLocationHandler:param_location:", e.detail.loc);
	console.log("urlLocationHandler:window.location.pathname:", window.location.pathname);

	const route = urlRoutes[e.detail.loc] || urlRoutes[404];
	//console.log("urlLocationHandler():route.page:", route.page);
	loadPage(route.page);
});

const urlClick = (data) => {
	//window.history.pushState({}, "", data.dataset.route);
	//urlLocationHandler(data.dataset.route);
	console.log("urlClick:data:", data);
};

/*document.addEventListener("click", (e) => {
	console.log("e:", e);
	const {target} = e;
	if(!target.matches("navbar-link")) {
		return;
	}
	e.preventDefault();
	urlRouter();
});*/

const urlRoutes = {
	404: {
		page: "/cloud-kms/pages/app/404",
		title: "404 Error: We lost the page, Oh No!",
		description: "File not found error page"
	},
	"/": {
		page: "index",
		title: "Welcome Home(Sanitarium)",
		description: "Where it all begins"
	},
	"labels": {
		page: "labels",
		title: "Labels &amp; Stuff",
		description: "For all your label printing needs"
	},
	"checkin": {
		page: "checkin",
		title: "Key Check In",
		description: "Gotta check em all"
	},
	"checkout": {
		page: "checkout",
		title: "Key CHeck Out",
		description: "Get em out...Shoo Shoo Shoo"
	}
};

/*const urlRouter = (event) => {
	event = event || window.event;
	event.preventDefault();
	window.history.pushState({}, "", event.target.href);
	urlLocationHandler();
};*/

const urlLocationHandler = async (param_location) => {
	/*var location = window.location.pathname;
	if(param_location.length == 1) {
		location = "/cloud-kms/";
		window.history.pushState({}, "", "/cloud-kms/");
	} else {
		window.history.pushState({}, "", param_location);
	}
	console.log("urlLocationHandler:param_location:", param_location);
	console.log("urlLocationHandler:window.location.pathname:", window.location.pathname);

	const route = urlRoutes[param_location] || urlRoutes[404];
	//console.log("urlLocationHandler():route.page:", route.page);
	loadPage(route.page);*/

	urlChangeEvent.detail.loc = param_location
	window.dispatchEvent(urlChangeEvent);
};