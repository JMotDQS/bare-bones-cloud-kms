/***** Global Use Variables */
const g_ROOT_PATH = 'http://localhost/bare-bones-cloud-kms/';
const APP_DIALOG = document.getElementById('g_dialog');
const LOGIN_CREDENTIALS_MISMATCH = 'Email/Password do not match for user.'
const LOGIN_NONACTIVE_USER_ERROR = '<p>You are NOT an Active user.</p><p>Please contact Supervisor.</p>'
const PREVENT_LOGIN_CLOSE = true;

function disableEscapeKeyDialogBehavior(event) {
	if(event.key === 'Escape' && PREVENT_LOGIN_CLOSE) {
		event.preventDefault();
	}
}
APP_DIALOG.addEventListener('keydown', disableEscapeKeyDialogBehavior);
//LOGIN_DIALOG.addEventListener('keydown', disableEscapeKeyDialogBehavior);
//CHOOSE_LOT_DIALOG.addEventListener('keydown', disableEscapeKeyDialogBehavior);
const CLICK_EVENT = new CustomEvent('click');

var g_TIMER;
var g_KEY_RESET_TIMER;
var g_CURRENT_USER_ID = '0';
var g_CURRENT_USER = [];
var g_USER_SEARCH = [];
var g_NO_SEARCH_RESULTS = '';
var g_SECTIONS = [];
var g_CONNECTION;
var g_CHOSEN_SECTION = -1;
var g_COMPANIES = [];
var g_NEW_LOCATION = '';
var g_ASSOCIATE_ITEMS = '';
var g_PRINT_USER_OBJ = {};
var g_CURRENT_VIN = '';
var g_CURRENT_LOT = [];
var g_FUNC_CALL_CNT = 0;

var g_lot_slots = [];
/*
g_lot_slots.push( {slot: '001A', full: 0} )
*/

const g_MAILBOX_LENGTH = 8;
const g_TIMEOUT_VAL = 500;
const g_RESET_TIMEOUT_VAL = 2000;
const g_IDLE_TIMEOUT_VAL = 60000;// in milliseconds
const g_APP = 'app';
const g_NAV = 'nav';
const g_DIALOG = 'dialog';
const g_VER = '3.0-Alpha';
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