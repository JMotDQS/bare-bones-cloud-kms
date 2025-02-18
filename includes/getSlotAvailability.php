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
		$sql = "SELECT kth.pk_id
				FROM key_tracking_historical AS kth
				WHERE kth.fk_g_lots_pk_id = '".$_POST['lot_id']."'
					AND kth.fk_key_slots_pk_id IN(
						SELECT pk_id
						FROM key_slots
						WHERE key_slot = '".$_POST['key_slot']."'
					)
					AND kth.fk_key_actions_pk_id IN(
						SELECT pk_id
						FROM key_actions
						WHERE key_action = 'In'
					)
				ORDER BY kth.created_date DESC";
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