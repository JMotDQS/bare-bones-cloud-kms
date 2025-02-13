<?php

	require_once("config.php");

	$return_array = [];
	
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
		$sql = "SELECT ksl.pk_id, ksl.key_slot
				FROM key_tracking AS kt
					INNER JOIN key_slots AS ksl ON ksl.pk_id = kt.fk_key_slots_pk_id
					INNER JOIN g_lots AS glot ON glot.pk_id = kt.fk_g_lots_pk_id
					INNER JOIN key_actions AS kac ON kac.pk_id = kt.fk_key_actions_pk_id
				WHERE kt.fk_g_lots_pk_id = '".$_POST['lot_pk_id']."'
					AND kt.fk_key_actions_pk_id IN(
						SELECT pk_id
						FROM key_actions
						WHERE key_action = 'In'
					)
				ORDER BY kt.updated_date DESC";
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