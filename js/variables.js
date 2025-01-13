/***** Global Use Variables */
const g_ROOT_PATH = 'http://localhost/cloud-kms/';
const LOGIN_DIALOG = document.querySelector('.dialog_login');
const CHOOSE_LOT_DIALOG = document.querySelector('.dialog_lot_choice');
const ADD_ADMIN_DIALOG = document.querySelector('.dialog_add_admin');
const PREVENT_LOGIN_CLOSE = true;
const DEFAULT_PASSWORD = 'P@ssw0rd';

function disableEscapeKeyDialogBehavior(event) {
	if(event.key === 'Escape' && PREVENT_LOGIN_CLOSE) {
		event.preventDefault();
	}
}
LOGIN_DIALOG.addEventListener('keydown', disableEscapeKeyDialogBehavior);
ADD_ADMIN_DIALOG.addEventListener('keydown', disableEscapeKeyDialogBehavior);
const CLICK_EVENT = new CustomEvent('click');

var g_TIMER;
var g_KEY_RESET_TIMER;
var g_CURRENT_LOGIN_USER_ID = '0';
var g_CURRENT_USER = [];
var g_USER_SEARCH = [];
var g_NO_SEARCH_RESULTS = '';
var g_SECTIONS = [];
var g_LOTS = [];
var g_CONNECTION;
var g_CHOSEN_SECTION = -1;
var g_COMPANIES = [];
var g_NEW_LOCATION = '';
var g_ASSOCIATE_ITEMS = '';
var g_PRINT_USER_OBJ = {};
var g_CURRENT_VIN = '';
var g_CURRENT_LOT = [];

const g_MAILBOX_LENGTH = 8;
const g_TIMEOUT_VAL = 500;
const g_RESET_TIMEOUT_VAL = 2000;
const g_APP = 'app';
const g_NAV = 'nav';
const g_DIALOG = 'dialog';
const g_VER = '2.2.3';
const g_VIN_LENGTH = 17;

const g_CONNECTION_ERROR_COPY = 'An error occured connecting to the data'

/***** Special Character Replacement Arrays Global Variables */
const g_SEARCH_ENTITIES = ["Ø", "°",
						"\"", "\'",
						"©", "®", "™",
						"à", "á", "À", "Á",
						"è", "é", "È", "É"];
const g_REPLACE_ENTITIES = ["&Oslash;", "&deg;",
						"&quot;", "&apos;",
						"&copy;", "&reg;", "&trade;",
						"&agrave;", "&aacute;", "&Agrave;", "&Aacute;",
						"&egrave;", "&eacute;", "&Egrave;", "&Eacute;"];

const sections = [
	{
		id: 1,
		section: "Labels",
		body: "Print QR Code VIN labels",
		icon: "fas fa-qrcode"
	},
	{
		id: 2,
		section: "Check In",
		body: "Key Check In",
		icon: "fas fa-sign-in-alt"
	},
	{
		id: 3,
		section: "Check Out",
		body: "Key Check Out",
		icon: "fas fa-sign-out-alt"
	},
	{
		id: 4,
		section: "Search",
		body: "Lookup VINs & Slots",
		icon: "fas fa-search"
	},
	{
		id: 5,
		section: "Reports",
		body: "Generate Any & All Reports",
		icon: "fas fa-file-alt"
	},
	{
		id: 6,
		section: "Dashboard",
		body: "Dashboard Stuff",
		icon: "fas fa-tachometer-alt"
	}
];