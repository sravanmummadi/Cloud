<?php

header('Access-Control-Allow-Origin:*');
$servername = "127.0.0.1";
$username = "root";
$password = "root";
$dbname= "db1";

//Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$symptom=$_GET['symptom'];
$chart3_sql="select AGE,SEX,count(*) as count from project2 where ADMITTING_DIAGNOSIS_CODE='". $symptom ."' group by AGE,SEX;";


$result = $conn->query($chart3_sql);

if ($result->num_rows > 0) {

    // output data of each row
    while($row = $result->fetch_assoc()) {

	$age=$row["AGE"]*10;
	$age_format=$age . "-" . ($age+9);
	$rec1=array('Age'=>$age_format,'Sex'=>$row["SEX"],'count'=>$row["count"]);

	$chart3[]=$rec1;
	

    }

   echo json_encode($chart3);

} else {
    echo $chart3_sql;
    echo "0 results";
}

?>
