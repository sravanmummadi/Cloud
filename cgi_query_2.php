<?php

header('Access-Control-Allow-Origin:*');
$servername = "127.0.0.1";
$username = "root";
$password = "root";
$dbname= "db1";

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$symptom=$_GET['symptom'];
	
if(empty($_GET['city']))
{
$city=$_GET['city'];
#$city="DALLAS";
//echo "Connected successfully";
//$chart2_sql="select * from project2 where ADMITTING_DIAGNOSIS_CODE='". $symptom ."' ORDER BY NATIONAL_PROVIDER_ID";




$chart2_sql="select NATIONAL_PROVIDER_ID, count(NATIONAL_PROVIDER_ID) AS deaths from project2 where ADMITTING_DIAGNOSIS_CODE='". $symptom ."'and ADMISSION_TO_DEATH_INTERVAL>0 GROUP BY NATIONAL_PROVIDER_ID ORDER BY deaths DESC";

}
else{
$city=$_GET['city'];
//$chart2_sql="select * from project2 where ADMITTING_DIAGNOSIS_CODE='". $symptom ."' and PROVIDER_CITY_NAME='". $city ."' ORDER BY NATIONAL_PROVIDER_ID";


$chart2_sql="select NATIONAL_PROVIDER_ID, count(NATIONAL_PROVIDER_ID) AS deaths from project2 where ADMITTING_DIAGNOSIS_CODE='". $symptom ."' and PROVIDER_CITY_NAME='". $city ."' and ADMISSION_TO_DEATH_INTERVAL>0 GROUP BY NATIONAL_PROVIDER_ID ORDER BY deaths DESC";

}


$result = $conn->query($chart2_sql);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
	
	
	
	$rec1=array('NATIONAL_PROVIDER_ID'=>$row["NATIONAL_PROVIDER_ID"],'deaths'=>$row["deaths"]);

	$chart2[]=$rec1;
	

    }

   echo json_encode($chart2);

} else {
    echo $chart2_sql;
    echo "0 results";
}
?>
