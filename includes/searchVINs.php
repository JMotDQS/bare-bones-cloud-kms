<?php

	require_once("config.php");

	$return_array = [];
	$serverName = $host."\\sqlexpress";

	// Since UID and PWD are not specified in the $connectionInfo array,
	// The connection will be attempted using Windows Authentication.
	$connectionInfo = array("Database"=>$db);
	$conn = sqlsrv_connect($serverName, $connectionInfo);

	if ($conn) {
		/*$sql = "SELECT *
				FROM vin_registration
				WHERE fk_g_lots_pk_id = '".$_POST['lot_pk_id']."'
					AND vin LIKE '%".$_POST['search_vin']."%'";

		$res = sqlsrv_query($conn, $sql);

		if (sqlsrv_has_rows($res)) {
			// record(s) found
		} else {
			// No record found
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