<?php

	require_once("config.php");

	$return_array = [];
	
	//$serverName = "";
	//$connectionInfo = array();
	//$serverName = $host;
	//$connectionInfo = array("UID"=>$user, "PWD"=>$pass, "Database"=>$db);
	//$conn = sqlsrv_connect($serverName, $connectionInfo);

	$KMS_serverName = "";
	$KMS_connectionInfo = array();
	$KMS_serverName = $KMS_host."\\sqlexpress";
	$KMS_connectionInfo = array("Database"=>$KMS_db);
	$KMS_conn = sqlsrv_connect($KMS_serverName, $KMS_connectionInfo);

	if ($KMS_conn) {
		$sql = "SELECT ksl.KeySlotId, ksl.KeySlot
				FROM KeyTracking AS kt
					INNER JOIN KeySlots AS ksl ON ksl.KeySlotId = kt.KeySlotId
					INNER JOIN KeyActions AS kac ON kac.KeyActionId = kt.KeyActionId
				WHERE kt.CompanyLocationId = '".$_POST['lot_id']."'
					AND kt.KeyActionId IN(
						SELECT KeyActionId
						FROM KeyActions
						WHERE KeyAction = 'In'
					)
				ORDER BY kt.Updated DESC";
		$res = sqlsrv_query($KMS_conn, $sql);

		if ($res) {
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($return_array, $row);
			}
		}

	}

	$close_success = sqlsrv_close($KMS_conn);
	if ($close_success) {
		echo json_encode($return_array);
	}

?>