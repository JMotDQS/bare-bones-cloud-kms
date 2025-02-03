<?php

	$return_array = [];
	$each_item = [];
	$success = false;
	$FileName = $_POST['lot_name'].'_hist_vin_report.csv';
	$fp = fopen('php://output', 'w');

	// Since UID and PWD are not specified in the $connectionInfo array,
	// The connection will be attempted using Windows Authentication.

	$fp = fopen('../../'.$FileName, 'w');
	fputcsv($fp, array("vin", "key_slot", "lot", "scn_date"));

	foreach($_POST['vin_list'] as $item) {
		$each_item['vin'] = $item['vin'];
		$each_item['key_slot'] = $item['key_slot'];
		$each_item['lot_name'] = $item['lot_name'];
		$each_item['scn_date'] = date("m/d/Y H:i:s");
		fputcsv($fp, $each_item);
	}
	$success = fclose($fp);

	echo json_encode($success);

?>