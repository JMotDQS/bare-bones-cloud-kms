<?php

	require_once("config.php");

	$return_array = [];
	$return_array['conn'] = false;
	$return_array['sections'] = [];
	
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
		$return_array['conn'] = true;
		$sql = "SELECT pk_id, section, body_copy, icon
				FROM kms_sections
				ORDER BY display_order ASC";
		$res = sqlsrv_query($conn, $sql);

		if ($res) {
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($return_array['sections'], $row);
			}
		}

	}

	$close_success = sqlsrv_close($conn);
	if ($close_success) {
		echo json_encode($return_array);
	}

?>