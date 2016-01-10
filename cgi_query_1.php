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
if(!empty($_GET['city'])) {

	$city=$_GET['city'];
	

#$city="DALLAS";
//echo "Connected successfully";
$chart1_sql="SELECT NATIONAL_PROVIDER_ID,COVERED_CHARGES,TOTAL_CHARGES FROM db1.project2 where PROVIDER_CITY_NAME ='". $city ."' group by NATIONAL_PROVIDER_ID";

$result = $conn->query($chart1_sql);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {

	$percentage=$row["COVERED_CHARGES"]/$row["TOTAL_CHARGES"]*100;
	
	$rec1=array('NATIONAL_PROVIDER_ID'=>$row["NATIONAL_PROVIDER_ID"],'covered_charges'=>$row["COVERED_CHARGES"],'total_charges'=>$row["TOTAL_CHARGES"],'percentage'=>$percentage);
	$chart1[]=$rec1;
        //echo "chart1: " . $chart1[0]['NATIONAL_PROVIDER_ID'] . "<br>";	
    }
   $charts[]=array('chart1'=>$chart1);
   $charts[]=array('chart2'=>$chart1);
   echo json_encode($chart1);
} else {
    echo "0 results";
}

}
else
{
 echo "enter city value";
}
?>
