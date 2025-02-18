<?php

	require_once("config.php");

	$return_array = [];
	$temp_array = [];
	$reg_vin_pk_id = '';

	$serverName = "";
	$KMS_serverName = "";

	$connectionInfo = array();
	$KMS_connectionInfo = array();
	//if ($connType == "SQLServer")
	//{
		$serverName = $host;
		$connectionInfo = array("UID"=>$user, "PWD"=>$pass, "Database"=>$db);
	//}
	//else
	//{
		$KMS_serverName = $KMS_host."\\sqlexpress";
		$KMS_connectionInfo = array("Database"=>$KMS_db);
	//}
	
	$conn = sqlsrv_connect($serverName, $connectionInfo);
	$KMS_conn = sqlsrv_connect($KMS_serverName, $KMS_connectionInfo);

	if ($conn) {
		/*** Check if VIN is registered, if not then register it ***/
		$sql = "SELECT *
				FROM CompanyLocations
				WHERE CompanyLocationId = '4A3D4631-9279-409D-BBF2-CDEA25167B85'";
		$res = sqlsrv_query($conn, $sql);

		if ($res) {
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($temp_array, $row);
			}
		}
	}

	$close_success = sqlsrv_close($conn);
	if ($close_success) {
		echo json_encode($temp_array);
	}

?>