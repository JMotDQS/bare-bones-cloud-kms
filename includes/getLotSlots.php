<?php

	require_once("config.php");

	$return_array = [];
	
	$serverName = "";
	$KMS_serverName = "";

	$connectionInfo = array();
	$KMS_connectionInfo = array();

	$serverName = $host;
	$connectionInfo = array("UID"=>$user, "PWD"=>$pass, "Database"=>$db);

	$KMS_serverName = $KMS_host."\\sqlexpress";
	$KMS_connectionInfo = array("Database"=>$KMS_db);
	
	$conn = sqlsrv_connect($serverName, $connectionInfo);
	$KMS_conn = sqlsrv_connect($KMS_serverName, $KMS_connectionInfo);

	if ($conn) {
		$sql = "SELECT CAST(1.1 * lot_capacity AS INT) AS lot_capacity
								FROM g_lots
								WHERE pk_id = '".$_POST['lot_id']."'";
		$res = sqlsrv_query($conn, $sql);
		if ($res) {
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($return_array, $row);
			}
		};
		$cap = $return_array[0]['lot_capacity'];
		while(($cap % 10) > 0) {
			$cap++;
		}
		
		$return_array = [];
		$sql = "SELECT TOP (".$cap.") pk_id, key_slot
				FROM key_slots
				ORDER BY key_slot ASC";
		$res = sqlsrv_query($conn, $sql);

		if ($res) {
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($return_array, $row);
			}
		}

	}

	$close_success = sqlsrv_close($conn);
	if ($close_success) {
		echo json_encode($return_array);
	}

?>