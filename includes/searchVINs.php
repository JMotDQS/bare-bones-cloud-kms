<?php

	require_once("config.php");

	$return_array = [];
	$temp_array = [];
	$return_array['vins'] = [];
	$return_array['reg_error'] = '';
	
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
		$sql = "SELECT kt.KeyTrackingId, kt.Created, kt.Updated, kt.KeySlotId AS KeySlotId, ksl.KeySlot,
						kt.KeyActionId AS KeyActionId, kac.KeyAction, vin.VinRegistrationId AS VinRegistrationId,
						vin.Vin, kt.CompanyLocationId AS CompanyLocationId
				FROM KeyTracking AS kt
					INNER JOIN VinRegistration AS vin ON vin.VinRegistrationId = kt.VinRegistrationId
					--INNER JOIN g_lots AS lot ON lot.pk_id = kt.fk_g_lots_pk_id
					INNER JOIN KeyActions AS kac ON kac.KeyActionId = kt.KeyActionId
					INNER JOIN KeySlots AS ksl ON ksl.KeySlotId = kt.KeySlotId
				WHERE kt.VinRegistrationId IN(
					SELECT VinRegistrationId
					FROM VinRegistration
					WHERE Vin LIKE '%".$_POST['search_vin']."%'
				)
				ORDER BY kt.Updated ASC, kt.CompanyLocationId ASC, ksl.KeySlot ASC";

		$res = sqlsrv_query($KMS_conn, $sql);

		if (sqlsrv_has_rows($res)) {
			// record(s) found
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($return_array['vins'], $row);
			}
		} else {
			// No record found
			$return_array['reg_error'] = 'Search produced no results in KMS.';
		}
	}

	if ($conn) {
		for($i = 0; $i < count($return_array['vins']); $i++) {
			$sql = "SELECT kl.Name AS CompanyLocationName
					FROM CompanyLocations AS kl
					WHERE kl.CompanyLocationId = '".$return_array['vins'][$i]['CompanyLocationId']."'";
			$res = sqlsrv_query($conn, $sql);

			if (sqlsrv_has_rows($res)) {
				// record(s) found
				$temp_array = [];
				while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
					array_push($temp_array, $row);
				}

				$return_array['vins'][$i]['CompanyLocationName'] = $temp_array[0]['CompanyLocationName'];
			}
		}
	}

	sqlsrv_close($conn);
	$close_success = sqlsrv_close($KMS_conn);
	if ($close_success) {
		echo json_encode($return_array);
	}

?>