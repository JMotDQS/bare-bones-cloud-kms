<?php

	require_once("config.php");

	$return_array = [];
	$FileName = $_POST['lot_name'].'_vins_report.csv';
	$fp = fopen('php://output', 'w');

	/*$serverName = "";
	$connectionInfo = array();
	$serverName = $host;
	$connectionInfo = array("UID"=>$user, "PWD"=>$pass, "Database"=>$db);
	$conn = sqlsrv_connect($serverName, $connectionInfo);*/

	$KMS_serverName = "";
	$KMS_connectionInfo = array();
	$KMS_serverName = $KMS_host."\\sqlexpress";
	$KMS_connectionInfo = array("Database"=>$KMS_db);
	$KMS_conn = sqlsrv_connect($KMS_serverName, $KMS_connectionInfo);

	if ($KMS_conn) {
		$sql = "SELECT vin.vin, ks.KeySlot,
					IIF(kt.Updated IS NULL,
						FORMAT(kt.Created, 'M/d/yyyy HH:mm:ss'),
						FORMAT(kt.Updated, 'M/d/yyyy HH:mm:ss')
					) AS LastScanDate
				FROM KeyTracking AS kt
					INNER JOIN VinRegistration AS vin ON vin.VinRegistrationId = kt.VinRegistrationId
					INNER JOIN KeySlots AS ks ON ks.KeySlotId = kt.KeySlotId
				WHERE kt.KeyActionId = (
					SELECT ka.KeyActionId
					FROM KeyActions AS ka
					WHERE ka.KeyAction = 'In'
				)
					AND kt.CompanyLocationId = '".$_POST['lot_pk_id']."'
				ORDER BY ks.KeySlot ASC";
		$res = sqlsrv_query($KMS_conn, $sql);

		if (sqlsrv_has_rows($res)) {
			$fp = fopen('../../'.$FileName, 'w');
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($return_array, $row);
				if (!isset($headings)) {
					$headings = array_keys($row);
					array_push($headings, 'LotName');
					
					fputcsv($fp, $headings, ',', '"');
				}
			}
		} else {
			echo json_encode(false);
			die();
		}

	}

	$close_success = sqlsrv_close($KMS_conn);
	if ($close_success) {
		foreach ($return_array as $pair) {
			$pair['LotName'] = $_POST['lot_name'];
			fputcsv($fp, $pair);
		}
		fclose($fp);
	}
	echo json_encode(true);

?>