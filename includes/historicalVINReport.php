<?php

	require_once("config.php");

	$return_array = [];
	$FileName = $_POST['lot_name'].'_hist_vin_report.csv';
	$fp = fopen('php://output', 'w');
	
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
		$sql = "SELECT vin.vin, ksl.key_slot, glot.lot_name,
					FORMAT(kth.created_date, 'M/d/yyyy HH:mm:ss') AS scan_date,
					kac.key_action
				FROM key_tracking_historical AS kth
					INNER JOIN vin_registration AS vin ON vin.pk_id = kth.fk_vin_registration_pk_id
					INNER JOIN key_slots AS ksl ON ksl.pk_id = kth.fk_key_slots_pk_id
					INNER JOIN g_lots AS glot ON glot.pk_id = kth.fk_g_lots_pk_id
					INNER JOIN key_actions AS kac ON kac.pk_id = kth.fk_key_actions_pk_id
				WHERE vin.vin IN(".$_POST['vin_list'].")
					AND kth.fk_g_lots_pk_id = (
						SELECT pk_id
						FROM g_lots AS glot
						WHERE glot.pk_id = '".$_POST['lot_pk_id']."'
					)
				ORDER BY vin.vin ASC, kth.created_date ASC";
		$res = sqlsrv_query($conn, $sql);

		if (sqlsrv_has_rows($res)) {
			$fp = fopen('../../'.$FileName, 'w');
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($return_array, $row);
				if (!isset($headings)) {
					$headings = array_keys($row);
					fputcsv($fp, $headings, ',', '"');
				}
			}
		} else {
			echo json_encode(false);
			die();
		}

	}

	$close_success = sqlsrv_close($conn);
	if ($close_success) {
		foreach ($return_array as $pair) {
			fputcsv($fp, $pair);
		}
		fclose($fp);
	}
	echo json_encode(true);

?>