<?php
	require_once("config.php");

	$return_array = [];
	$slot_array = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
	$slot_count = count($slot_array);
	$case_num = 1;
	$serverName = $host."\\sqlexpress";

	$connectionInfo = array("Database"=>$db);
	$conn = sqlsrv_connect($serverName, $connectionInfo);

	if ($conn) {
		$sql = "SELECT TOP (1) lot_capacity
				FROM g_lots
				ORDER BY lot_capacity DESC";
		$res = sqlsrv_query($conn, $sql);

		if ($res) {
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($return_array, $row);
			}
		}
		$total_cases = ((int) $return_array[0]['lot_capacity'] * 1.1) / 10;

		while($case_num <= $total_cases) {
			if($case_num > 0 && $case_num < 10) {
				$temp_case = '00'. $case_num;
			} elseif($case_num > 9 && $case_num < 100) {
				$temp_case = '0'. $case_num;
			} else {
				$temp_case = $case_num;
			}

			print_r($temp_case.'<br/>');

			$sql = "INSERT INTO key_slots (created_date, key_slot) VALUES ";

			for($i = 0; $i < $slot_count; $i++) {
				$temp_slot = $temp_case.$slot_array[$i];

				$sql .= "(GETDATE(), '".$temp_slot."')";
				if($i < ($slot_count - 1)) {
					$sql .= ", ";
				}
			}
			$res = sqlsrv_query($conn, $sql);

			$case_num++;
		}

	}
?>