<?php

	require_once("config.php");

	$return_array = [];
	$temp_array = [];
	$reg_vin_pk_id = '';

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
		/*** Check if VIN is registered, if not then register it ***/
		$sql = "SELECT VinRegistrationId
				FROM VinRegistration
				WHERE Vin = '".$_POST['vin']."'";
		$res = sqlsrv_query($KMS_conn, $sql);

		if (sqlsrv_has_rows($res)) {
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($temp_array, $row);
			}
		} else {
			$sql = "INSERT INTO VinRegistration
								(Created, Vin, UserId, CompanyLocationId)
					OUTPUT INSERTED.VinRegistrationId
					VALUES(GETDATE(), '".$_POST['vin']."', '".$_POST['user_id']."', '".$_POST['lot_id']."')";
			$res = sqlsrv_query($KMS_conn, $sql);

			if (($res)) {
				while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
					array_push($temp_array, $row);
				}
			}
		}
		$reg_vin_pk_id = $temp_array[0]['VinRegistrationId'];
		$temp_array = [];

		$sql = "INSERT INTO KeyTrackingHistorical
							(Created, VinRegistrationId, CompanyLocationId,
							KeyActionId, KeySlotId, UserId)
				VALUES(GETDATE(), '".$reg_vin_pk_id."', '".$_POST['lot_id']."',
					(
						SELECT KeyActionId
						FROM KeyActions
						WHERE KeyAction = 'In'
					),
					(
						SELECT KeySlotId
						FROM KeySLots
						WHERE KeySlot = '".$_POST['key_slot']."'
					), '".$_POST['user_id']."')";
		$res = sqlsrv_query($KMS_conn, $sql);

		$sql = "SELECT KeyTrackingId
				FROM KeyTracking
				WHERE VinRegistrationId = '".$reg_vin_pk_id."'";
		$res = sqlsrv_query($KMS_conn, $sql);

		if (sqlsrv_has_rows($res)) {
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($temp_array, $row);
			}

			$sql = "UPDATE KeyTracking
					SET Updated = GETDATE(),
						CompanyLocationId = '".$_POST['lot_id']."',
						KeyActionid = (
							SELECT KeyActionId
							FROM KeyActions
							WHERE KeyAction = 'In'
						),
						KeySlotId = (
							SELECT KeySlotId
							FROM KeySlots
							WHERE KeySlot = '".$_POST['key_slot']."'
						),
						UserId = '".$_POST['user_id']."'
					WHERE KeyTrackingId = '".$temp_array[0]['KeyTrackingId']."'";
		} else {
			$sql = "INSERT INTO KeyTracking
							(Created, VinRegistrationId, CompanyLocationId,
							KeyActionId, KeySlotId, UserId)
					VALUES(GETDATE(), '".$reg_vin_pk_id."', '".$_POST['lot_id']."',
						(
							SELECT KeyActionId
							FROM KeyActions
							WHERE KeyAction = 'In'
						),
						(
							SELECT KeySlotId
							FROM KeySlots
							WHERE KeySlot = '".$_POST['key_slot']."'
						), '".$_POST['user_id']."')";
		}
		$res = sqlsrv_query($KMS_conn, $sql);
	}

	$close_success = sqlsrv_close($KMS_conn);
	if ($close_success) {
		echo json_encode($return_array);
	}

?>