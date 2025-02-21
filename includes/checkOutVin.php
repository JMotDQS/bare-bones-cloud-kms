<?php

	require_once("config.php");

	$return_array = [false];
	$temp_array = [];
	
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
		$sql = "INSERT INTO KeyTrackingHistorical
							(Created, VinRegistrationId, COmpanyLocationId,
							KeyActionId, KeySlotId, UserId)
				VALUES(GETDATE(), '".$_POST['vin_pk_id']."', '".$_POST['lot_pk_id']."',
					(
						SELECT KeyActionId
						FROM KeyActions
						WHERE KeyAction = 'Out'
					), '".$_POST['slot_pk_id']."', '".$_POST['user_id']."')";
		$res = sqlsrv_query($KMS_conn, $sql);

		$sql = "SELECT KeyTrackingId
				FROM KeyTracking
				WHERE VinRegistrationId = '".$_POST['vin_pk_id']."'";
		$res = sqlsrv_query($KMS_conn, $sql);

		if (sqlsrv_has_rows($res)) {
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($temp_array, $row);
			}

			$sql = "UPDATE KeyTracking
					SET Updated = GETDATE(),
						CompanyLocationId = '".$_POST['lot_pk_id']."',
						KeyActionId = (
							SELECT KeyActionId
							FROM KeyActions
							WHERE KeyAction = 'Out'
						), KeySlotId = '".$_POST['slot_pk_id']."',
						UserId = '".$_POST['user_id']."'
					WHERE KeyTrackingId = '".$temp_array[0]['KeyTrackingId']."'";
		} else {
			$sql = "INSERT INTO KeyTracking
							(Created, VinRegistrationId, CompanyLocationId,
							KeyActionId, KeySlotId, UserId)
					VALUES(GETDATE(), '".$_POST['vin_pk_id']."', '".$_POST['lot_pk_id']."',
						(
							SELECT KeyActionId
							FROM KeyActions
							WHERE KeyAction = 'Out'
						), '".$_POST['slot_pk_id']."', '".$_POST['user_id']."')";
		}
		$res = sqlsrv_query($KMS_conn, $sql);
	}

	$close_success = sqlsrv_close($KMS_conn);
	if ($close_success) {
		$return_array[0] = true;
	}
	echo json_encode($return_array);

?>