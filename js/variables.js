/***** Global Use Variables */
const g_APPLICATION_ID = '16D52421-65B4-46C8-80C6-DA44AEE72B48';
const g_ROOT_PATH = 'http://localhost/bare-bones-cloud-kms/';
const APP_DIALOG = document.getElementById('g_dialog');
const ROOT_BODY_ELEMENT = document.getElementById('card-template-container');

const LOGIN_CREDENTIALS_MISMATCH = 'Email/Password do not match for user.'
const LOGIN_NONACTIVE_USER_ERROR = '<p>You are NOT an Active user.</p><p>Please contact Supervisor.</p>'
const PREVENT_LOGIN_CLOSE = true;

const g_TIMEOUT_VAL = 500;
//const g_RESET_TIMEOUT_VAL = 2000;
const g_IDLE_TIMEOUT_VAL = 60000;// in milliseconds
//const g_APP = 'app';
//const g_NAV = 'nav';
const g_DIALOG = 'dialog';
const g_VER = '3.0-Alpha';
const g_VIN_LENGTH = 17;

const g_LOT_CONFIG_EXT = 'dqcnf';

const g_CONNECTION_ERROR_COPY = 'An error occured connecting to the data';
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

var g_TIMER;
var g_CURRENT_USER_ID = '0';
var g_CURRENT_USER = [];
var g_SECTIONS = [];
//var g_CONNECTION;
var g_CHOSEN_SECTION = -1;
var g_CURRENT_VIN = '';
var g_CURRENT_LOT = [];

var lot_slots_state = [];
var slots_open_by_case = [];

var bulk_vin_search_results = [];
var cur_lot_vin_search_results = [];
var rem_lots_vin_search_results = [];

var physical_inv_array = [];

function disableEscapeKeyDialogBehavior(event) {
	if(event.key === 'Escape' && PREVENT_LOGIN_CLOSE) {
		event.preventDefault();
	}
}
APP_DIALOG.addEventListener('keydown', disableEscapeKeyDialogBehavior);
//LOGIN_DIALOG.addEventListener('keydown', disableEscapeKeyDialogBehavior);
//CHOOSE_LOT_DIALOG.addEventListener('keydown', disableEscapeKeyDialogBehavior);