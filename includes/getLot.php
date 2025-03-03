<?php

	require_once("config.php");

	$return_array = [];

	$serverName = "";
	$connectionInfo = array();
	$serverName = $host;
	$connectionInfo = array("UID"=>$user, "PWD"=>$pass, "Database"=>$db);
	$conn = sqlsrv_connect($serverName, $connectionInfo);

	/*$KMS_serverName = "";
	$KMS_connectionInfo = array();
	$KMS_serverName = $KMS_host."\\sqlexpress";
	$KMS_connectionInfo = array("Database"=>$KMS_db);
	$KMS_conn = sqlsrv_connect($KMS_serverName, $KMS_connectionInfo);*/

	if ($conn) {
		$sql = "SELECT cl.CompanyLocationId, cl.CompanyId, cl.Name, cl.Address, cl.Latitude, cl.Longitude, tl.LotCapacity
				FROM CompanyLocations AS cl
					INNER JOIN TransportLots AS tl ON tl.CompanyLocationId = cl.CompanyLocationId
				WHERE cl.CompanyLocationId = '".$_POST['lot_id']."'
				ORDER BY cl.Name ASC";
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