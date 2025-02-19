<?php

	require_once("config.php");

	$module_array = [];
	$return_array = [];
	$module_string = "";
	
	$serverName = "";
	$connectionInfo = array();
	$serverName = $host;
	$connectionInfo = array("UID"=>$user, "PWD"=>$pass, "Database"=>$db);
	$conn = sqlsrv_connect($serverName, $connectionInfo);

	$KMS_serverName = "";
	$KMS_connectionInfo = array();
	$KMS_serverName = $KMS_host."\\sqlexpress";
	$KMS_connectionInfo = array("Database"=>$KMS_db);
	$KMS_conn = sqlsrv_connect($KMS_serverName, $KMS_connectionInfo);

	if ($conn) {
		$sql = "SELECT arm.ModuleId, am.Name
				FROM ApplicationRoleModules AS arm
					INNER JOIN ApplicationModules AS am ON am.ModuleId = arm.ModuleId
				WHERE arm.RoleId = ".$_POST['role_id'];
		$res = sqlsrv_query($conn, $sql);

		if ($res) {
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($module_array, $row);
			}
		}

	}

	for($i = 0; $i < count($module_array); $i++) {
		$module_string .= "'".$module_array[$i]['ModuleId']."',";
	}
	$module_string = rtrim($module_string, ',');

	if ($KMS_conn) {
		$sql = "SELECT kmss.KmsSectionId, kmss.Created, kmss.ModuleId, kmss.BodyCopy, kmss.Icon, kmss.DisplayOrder
				FROM KmsSections AS kmss
				WHERE kmss.ModuleId IN (".$module_string.")
				ORDER BY kmss.DisplayOrder";
		$res = sqlsrv_query($KMS_conn, $sql);

		if ($res) {
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($return_array, $row);
			}
		}

	}

	for($i = 0; $i < count($return_array); $i++) {
		for($q = 0; $q < count($module_array); $q++) {
			if($module_array[$q]['ModuleId'] == $return_array[$i]['ModuleId']) {
				$return_array[$i]['Name'] = $module_array[$q]['Name'];
			}
		}
	}

	$close_success = sqlsrv_close($conn);
	sqlsrv_close($KMS_conn);
	if ($close_success) {
		echo json_encode($return_array);
	}

?>