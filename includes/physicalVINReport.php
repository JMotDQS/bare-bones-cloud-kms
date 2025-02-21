<?php

	$return_array = [];
	$each_item = [];
	$success = false;
	$FileName = $_POST['lot_name'].'_hist_vin_report.csv';
	$fp = fopen('php://output', 'w');

	// Since UID and PWD are not specified in the $connectionInfo array,
	// The connection will be attempted using Windows Authentication.

	$fp = fopen('../../'.$FileName, 'w');
	fputcsv($fp, array("Vin", "KeySlot", "LotName", "ScanDate"));

	foreach($_POST['vin_list'] as $item) {
		$each_item['Vin'] = $item['Vin'];
		$each_item['KeySlot'] = $item['KeySlot'];
		$each_item['CompanyLocationName'] = $item['CompanyLocationName'];
		$each_item['ScanDate'] = date("m/d/Y H:i:s");
		fputcsv($fp, $each_item);
	}
	$success = fclose($fp);

	echo json_encode($success);

?>