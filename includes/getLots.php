<?php

	require_once("config.php");

	$return_array = [];
	$serverName = $host."\\sqlexpress";

	$lot_pk_id_config = file_get_contents('C:\kms_config\kms_config.txt');

	// Since UID and PWD are not specified in the $connectionInfo array,
	// The connection will be attempted using Windows Authentication.
	$connectionInfo = array("Database"=>$db);
	$conn = sqlsrv_connect($serverName, $connectionInfo);

	if ($conn) {
		/*if ((int) $_POST['param_admin'] == 1) {
			$sql = "SELECT gl.pk_id, gl.lot_name, gl.lot_address, gl.lot_city, gl.lot_zip, gl.lot_capacity, gl.lot_active, gs.state_name, gs.state_abv, man.manufacturer
					FROM g_lots AS gl
						INNER JOIN g_states AS gs ON gs.pk_id = gl.fk_g_states_pk_id
						INNER JOIN manufacturers AS man ON man.pk_id = gl.fk_manufacturers_pk_id
					ORDER BY gl.lot_active DESC, gl.lot_name ASC";
		} else {
			$sql = "SELECT gl.pk_id, gl.lot_name, gl.lot_address, gl.lot_city, gl.lot_zip, gl.lot_capacity, gs.state_name, gs.state_abv, man.manufacturer
					FROM g_lots AS gl
						INNER JOIN g_states AS gs ON gs.pk_id = gl.fk_g_states_pk_id
						INNER JOIN manufacturers AS man ON man.pk_id = gl.fk_manufacturers_pk_id
					WHERE gl.pk_id IN(
						SELECT fk_g_lots_pk_id
						FROM xref_g_employees_g_lots
						WHERE fk_g_employee_pk_id = '".$_POST['param_userid']."'
					)
						AND gl.lot_active = 1
					ORDER BY gl.lot_name ASC";
		}*/

		$sql = "SELECT gl.pk_id, gl.lot_name, gl.lot_address, gl.lot_city, gl.lot_zip, gl.lot_capacity, gl.lot_active, gs.state_name, gs.state_abv, man.manufacturer
				FROM g_lots AS gl
					INNER JOIN g_states AS gs ON gs.pk_id = gl.fk_g_states_pk_id
					INNER JOIN manufacturers AS man ON man.pk_id = gl.fk_manufacturers_pk_id
				WHERE gl.pk_id = '".$lot_pk_id_config."'
				ORDER BY gl.lot_name ASC";

		//echo json_encode($sql);
		//die();
		$res = sqlsrv_query($conn, $sql);

		if ($res) {
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($return_array, $row);
			}
		}

	}

	$close_success = sqlsrv_close($conn);
	if ($close_success) {
		echo json_encode($return_array);
	}

?>