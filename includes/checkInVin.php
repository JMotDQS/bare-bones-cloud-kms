<?php

	require_once("config.php");

	$return_array = [];
	$temp_array = [];
	$reg_vin_pk_id = '';
	$serverName = $host."\\sqlexpress";

	// Since UID and PWD are not specified in the $connectionInfo array,
	// The connection will be attempted using Windows Authentication.
	$connectionInfo = array("Database"=>$db);
	$conn = sqlsrv_connect($serverName, $connectionInfo);

	if ($conn) {
		/*** Check if VIN is registered, if not then register it ***/
		/*$sql = "SELECT pk_id
				FROM vin_registration
				WHERE vin = '".$_POST['vin']."'";
		$res = sqlsrv_query($conn, $sql);

		if (!sqlsrv_num_rows($res)) {
			$sql = "INSERT INTO vin_registration
								(created_date, vin, fk_g_employees_pk_id, fk_g_lots_pk_id)
					OUTPUT INSERTED.pk_id
					VALUES(GETDATE(), '".$_POST['vin']."', '".$_POST['user_id']."', '".$_POST['lot_id']."')";
			$res = sqlsrv_query($conn, $sql);

			if ($res) {
				while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
					array_push($temp_array, $row);
				}
			}
		} else {
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($temp_array, $row);
			}
		}
		$reg_vin_pk_id = $temp_array[0].pk_id;*/
		//echo json_encode($temp_array[0].pk_id);
		//die();

		$sql = "INSERT INTO key_tracking_historical
							(created_date, fk_vin_registration_pk_id, fk_g_lots_pk_id,
							fk_key_actions_pk_id, fk_key_slots_pk_id, fk_g_employees_pk_id)
				VALUES(GETDATE(), '".$reg_vin_pk_id."', '".$_POST['lot_id']."',
					(
						SELECT pk_id
						FROM key_actions
						WHERE key_action = 'In'
					),
					(
						SELECT pk_id
						FROM key_slots
						WHERE key_slot = '".$_POST['key_slot']."'
					), '".$_POST['user_id']."')";

		echo json_encode($sql);
		die();

		/*$sql = "SELECT pk_id
				FROM g_key_tracking_historical AS kth
				WHERE kth.fk_g_lots_pk_id = '".$_POST['lot_id']."'
					AND kth.fk_key_slots_pk_id IN(
						SELECT pk_id
						FROM key_slots
						WHERE key_slot = '".$_POST['key_slot']."'
					)
					AND kth.fk_key_actions_pk_id IN(
						SELECT pk_id
						FROM key_actions
						WHERE key_action = 'Check In'
					)
				ORDER BY kht.created_date DESC";*/
		//echo json_encode($sql);
		//die();
		

		/*if ($res) {
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($return_array, $row);
			}
		}*/

	}

	$close_success = sqlsrv_close($conn);
	if ($close_success) {
		echo json_encode($return_array);
	}

?>