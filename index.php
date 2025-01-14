<!doctype html>

<html>
	<head>
		<meta charset="utf-8"/>	
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
		<meta http-equiv="X-UA-Compatible" content="IE=11" />

		<title>Cloud DQS-KMS</title>

	<!-- Custom CSS -->
		<link rel="stylesheet" href="css/index.css">
		<link rel="stylesheet" href="css/navbar.css">
		<link rel="stylesheet" href="css/dialog.css">
		<!--<link rel="stylesheet" href="css/custom.css">
		<link rel="stylesheet" href="css/dialogUser.css">
		<link rel="stylesheet" href="css/dialogLogin.css">
		<link rel="stylesheet" href="css/dialogUpdatePassword.css">
		<link rel="stylesheet" href="css/dialogBulkAddUser.css">-->

	</head>

	<body id="home">
		<nav id="nav">
			<div class="nav-logo-container">
				<img src="images/DQS_logo.svg" id="logo-header" class="nav-logo" data-page='kms' alt="" />
			</div>
			<ul class="nav-links">
				<a class="navbar-item navbar-link" data-page="kms" onclick="loadTemplate(this.dataset.page)">KMS</a>
				<li class="navbar-item nav-item-divider">|</li>
				<a class="navbar-item navbar-link" data-page="docs" onclick="loadTemplate(this.dataset.page)">Docs</a>
				<li class="navbar-item nav-item-divider">|</li>
				<a id="navbar-link-lots" class="navbar-item navbar-link" data-page="lots" onclick="loadTemplate(this.dataset.page)">Lots</a>
				<li id="navbar-link-lots-divider" class="navbar-item nav-item-divider">|</li>
				<a id="navbar-link-logout" class="navbar-item navbar-link" data-page="logout" onclick="logOut()">Log Out</a>
				<li id="navbar-link-lots-divider" class="navbar-item nav-item-divider">|</li>
				<li id="navbar-user" class="navbar-item nav-item-divider nav-item-hide">user name</li>
			</ul>
		</nav>
		<div id="app" class="main-container">
			<div id="card-template-container" class="invisible grid-container disable-hover"></div>
		</div>

		<dialog id="dialog_login" class="g_dialog dialog_login"></dialog>
		<dialog id="dialog_lot_choice" class="g_dialog dialog_lot_choice"></dialog>

	<!-- JQuery CDN -->
		<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

	<!-- Latest compiled Font Awesome JavaScript -->
		<script defer src="https://use.fontawesome.com/releases/v5.0.13/js/all.js" integrity="sha384-xymdQtn1n3lH2wcu0qhcdaOpQwyoarkgLVxC/wZ5q7h9gHtxICrpcaSUfygqZGOe" crossorigin="anonymous"></script>

	<!-- Custom JavaScript -->
		<script src="js/variables.js"></script>
		<script src="js/promises.js"></script>
		<script src="js/templates.js"></script>
		<script src="js/kmsTemplate.js"></script>
		<script src="js/checkinTemplate.js"></script>
		<script src="js/dialogLogin.js"></script>
		<script src="js/dialogUpdatePassword.js"></script>
		<script src="js/helper.js"></script>
		<script src="js/keyevents.js"></script>
		<script src="js/slider.js"></script>
		<script src="js/index.js"></script>
		<!--<script src="js/urlRouter.js"></script>
		<script src="js/custom.js"></script>
		<script src="js/users.js"></script>
		<script src="js/itemAssociation.js"></script>
		<script src="js/reports.js"></script>
		<script src="js/dialogUser.js"></script>
		<script src="js/dialogLogin.js"></script>
		<script src="js/dialogAddAdmin.js"></script>
		<script src="js/dialogUpdatePassword.js"></script>
		<script src="js/dialogBulkAddUser.js"></script>-->
	</body>
</html>