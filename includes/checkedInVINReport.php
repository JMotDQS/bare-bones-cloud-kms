<?php

	require_once("config.php");

	$return_array = [];
	$FileName = $_POST['lot_name'].'_vins_report.csv';
	$fp = fopen('php://output', 'w');

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
		$sql = "SELECT vin.vin, ksl.key_slot, glot.lot_name,
					IIF(kt.updated_date IS NULL,
						FORMAT(kt.created_date, 'M/d/yyyy HH:mm:ss'),
						FORMAT(kt.updated_date, 'M/d/yyyy HH:mm:ss')
					) AS last_scnd_date
				FROM key_tracking AS kt
					INNER JOIN vin_registration AS vin ON vin.pk_id = kt.fk_vin_registration_pk_id
					INNER JOIN key_slots AS ksl ON ksl.pk_id = kt.fk_key_slots_pk_id
					INNER JOIN g_lots AS glot ON glot.pk_id = kt.fk_g_lots_pk_id
				WHERE kt.fk_key_actions_pk_id = (
					SELECT pk_id
					FROM key_actions AS kac
					WHERE kac.key_action = 'In'
				)
					AND kt.fk_g_lots_pk_id = (
						SELECT pk_id
						FROM g_lots AS glot
						WHERE glot.pk_id = '".$_POST['lot_pk_id']."'
					)
				ORDER BY ksl.key_slot ASC";
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