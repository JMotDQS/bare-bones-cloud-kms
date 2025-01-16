<?php

	require_once("config.php");

	$return_array = [];
	$serverName = $host."\\sqlexpress";

	// Since UID and PWD are not specified in the $connectionInfo array,
	// The connection will be attempted using Windows Authentication.
	$connectionInfo = array("Database"=>$db);
	$conn = sqlsrv_connect($serverName, $connectionInfo);

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
		//echo json_encode($sql);
		//die();
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