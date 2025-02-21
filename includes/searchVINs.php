<?php

	require_once("config.php");

	$return_array = [];
	$return_array['vins'] = [];
	$return_array['reg_error'] = '';
	
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
		$sql = "SELECT kt.pk_id, kt.created_date, kt.updated_date, kt.fk_key_slots_pk_id AS slot_pk_id, ksl.key_slot,
						kt.fk_key_actions_pk_id AS action_pk_id, kac.key_action, vin.pk_id AS vin_pk_id, vin.vin, lot.pk_id AS lot_pk_id, lot.lot_name
				FROM key_tracking AS kt
					INNER JOIN vin_registration AS vin ON vin.pk_id = kt.fk_vin_registration_pk_id
					INNER JOIN g_lots AS lot ON lot.pk_id = kt.fk_g_lots_pk_id
					INNER JOIN key_actions AS kac ON kac.pk_id = kt.fk_key_actions_pk_id
					INNER JOIN key_slots AS ksl ON ksl.pk_id = kt.fk_key_slots_pk_id
				WHERE kt.fk_vin_registration_pk_id IN(
					SELECT pk_id
					FROM vin_registration
					WHERE vin LIKE '%".$_POST['search_vin']."%'
				)
				ORDER BY kt.updated_date ASC, lot.pk_id ASC, ksl.key_slot ASC";

		$res = sqlsrv_query($conn, $sql);

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

	$close_success = sqlsrv_close($conn);
	if ($close_success) {
		echo json_encode($return_array);
	}

?>