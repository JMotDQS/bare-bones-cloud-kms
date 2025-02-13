<?php

	require_once("config.php");

	$return_array = [false];
	$temp_array = [];
	
	$serverName = "";
	$connectionInfo = array();
	if ($connType == "SQLServer")
	{
		$serverName = $host;
		$connectionInfo = array("UID"=>$user, "PWD"=>$pass, "Database"=>$db);
	}
	else
	{
		$serverName = $host."\\sqlexpress";
		$connectionInfo = array("Database"=>$db);
	}
	
	$conn = sqlsrv_connect($serverName, $connectionInfo);

	if ($conn) {
		$sql = "INSERT INTO key_tracking_historical
							(created_date, fk_vin_registration_pk_id, fk_g_lots_pk_id,
							fk_key_actions_pk_id, fk_key_slots_pk_id, fk_g_employees_pk_id)
				VALUES(GETDATE(), '".$_POST['vin_pk_id']."', '".$_POST['lot_pk_id']."',
					(
						SELECT pk_id
						FROM key_actions
						WHERE key_action = 'Out'
					), '".$_POST['slot_pk_id']."', '".$_POST['user_id']."')";
		$res = sqlsrv_query($conn, $sql);

		$sql = "SELECT pk_id
				FROM key_tracking
				WHERE fk_vin_registration_pk_id = '".$_POST['vin_pk_id']."'";
		$res = sqlsrv_query($conn, $sql);

		if (sqlsrv_has_rows($res)) {
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($temp_array, $row);
			}

			$sql = "UPDATE key_tracking
					SET updated_date = GETDATE(),
						fk_g_lots_pk_id = '".$_POST['lot_pk_id']."',
						fk_key_actions_pk_id = (
							SELECT pk_id
							FROM key_actions
							WHERE key_action = 'Out'
						), fk_key_slots_pk_id = '".$_POST['slot_pk_id']."',
						fk_g_employees_pk_id = '".$_POST['user_id']."'
					WHERE pk_id = '".$temp_array[0]['pk_id']."'";
		} else {
			$sql = "INSERT INTO key_tracking
							(created_date, fk_vin_registration_pk_id, fk_g_lots_pk_id,
							fk_key_actions_pk_id, fk_key_slots_pk_id, fk_g_employees_pk_id)
					VALUES(GETDATE(), '".$_POST['vin_pk_id']."', '".$_POST['lot_pk_id']."',
						(
							SELECT pk_id
							FROM key_actions
							WHERE key_action = 'Out'
						), '".$_POST['slot_pk_id']."', '".$_POST['user_id']."')";
		}
		$res = sqlsrv_query($conn, $sql);
	}

	$close_success = sqlsrv_close($conn);
	if ($close_success) {
		$return_array[0] = true;
	}
	echo json_encode($return_array);

?>