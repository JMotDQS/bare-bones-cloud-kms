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

	if ($KMS_conn) {
		$sql = "SELECT kth.CompanyLocationId, vin.Vin, ks.KeySlot,
					FORMAT(kth.Created, 'M/d/yyyy HH:mm:ss') AS ScanDate,
					ka.KeyAction
				FROM KeyTrackingHistorical AS kth
					INNER JOIN VinRegistration AS vin ON vin.VinRegistrationId = kth.VinRegistrationId
					INNER JOIN KeySlots AS ks ON ks.KeySlotId = kth.KeySlotId
					INNER JOIN KeyActions AS ka ON ka.KeyActionId = kth.KeyActionId
				WHERE vin.Vin IN(".$_POST['vin_list'].")
				ORDER BY vin.Vin ASC, kth.Created ASC";
		$res = sqlsrv_query($KMS_conn, $sql);

		if (sqlsrv_has_rows($res)) {
			$fp = fopen('../../'.$FileName, 'w');
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($return_array, $row);
				if (!isset($headings)) {
					$headings = array_keys($row);
					array_push($headings, 'LotName');
					array_shift($headings);
					fputcsv($fp, $headings, ',', '"');
				}
			}
		} else {
			echo json_encode(false);
			die();
		}

	}

	if ($conn) {
		for($i = 0; $i < count($return_array); $i++) {
			$sql = "SELECT cl.Name
					FROM CompanyLocations AS cl
					WHERE cl.CompanyLocationId = '".$return_array[$i]['CompanyLocationId']."'";
			$res = sqlsrv_query($conn, $sql);
			if (sqlsrv_has_rows($res)) {
				while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
					$return_array[$i]['LotName'] = $row['Name'];
				}
			}
		}
	}
	for($i = 0; $i < count($return_array); $i++) {
		unset($return_array[$i]['CompanyLocationId']);
	}

	sqlsrv_close($conn);
	$close_success = sqlsrv_close($KMS_conn);
	if ($close_success) {
		foreach ($return_array as $pair) {
			fputcsv($fp, $pair);
		}
		fclose($fp);
	}
	echo json_encode(true);

?>