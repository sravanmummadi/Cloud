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
$chart2_sql="select * from project2 where ADMITTING_DIAGNOSIS_CODE='". $symptom ."' ORDER BY NATIONAL_PROVIDER_ID";




//$chart2_sql="select NATIONAL_PROVIDER_ID, count(NATIONAL_PROVIDER_ID) AS deaths from project2 where ADMITTING_DIAGNOSIS_CODE='". $symptom ."'and ADMISSION_TO_DEATH_INTERVAL>0 GROUP BY NATIONAL_PROVIDER_ID ORDER BY deaths DESC";

}
else{
$city=$_GET['city'];
$chart2_sql="select * from project2 where ADMITTING_DIAGNOSIS_CODE='". $symptom ."' and PROVIDER_CITY_NAME='". $city ."' ORDER BY NATIONAL_PROVIDER_ID";


//$chart2_sql="select NATIONAL_PROVIDER_ID, count(NATIONAL_PROVIDER_ID) AS deaths from project2 where ADMITTING_DIAGNOSIS_CODE='". $symptom ."' and PROVIDER_CITY_NAME='". $city ."' and ADMISSION_TO_DEATH_INTERVAL>0 GROUP BY NATIONAL_PROVIDER_ID ORDER BY deaths DESC";

}

$i=0;
$result = $conn->query($chart2_sql);
if ($result->num_rows > 0) {
    // output data of each row
	$total_patients=0;
	$rec1=array();
	$dead_patients=0;
    while($row = $result->fetch_assoc()) {
		
	$curr=$row["NATIONAL_PROVIDER_ID"];
	if($i==0)
	{
		$prev=$row["NATIONAL_PROVIDER_ID"];	
	}
	if($curr!=$prev)
		{	
 			 $prev=$curr;
	                $percentage=$dead_patients/$total_patients;
			//y=total_patients;
			 $rec1=array('NATIONAL_PROVIDER_ID'=>$NATIONAL_PROVIDER_ID,'name'=>$NATIONAL_PROVIDER_ID,'drilldown'=>$NATIONAL_PROVIDER_ID,'deaths'=>$dead_patients,'y'=>$total_patients,'dead_patients'=>$dead_patients,'percentage'=>$percentage,'patients'=>$patients);

		         $chart2[]=$rec1;
			 unset($patients);
			 $patients=array();
			 $total_patients=0;
			 $dead_patients=0;
			 
	
		}
	$NATIONAL_PROVIDER_ID=$row["NATIONAL_PROVIDER_ID"];
	
	$i+=1;
		$total_patients+=1;
		if($row["DISCHARGE_STATUS"]==1)			
			{
				$color="#90ed7d";
			}
		else
			{
				$dead_patients+=1;	
				$color="#f45b5b";
			}
		
		
		$procedures[]=$row["PROCEDURE_CODE_1"];
		$procedures[]=$row["PROCEDURE_CODE_2"];
		$procedures[]=$row["PROCEDURE_CODE_3"];
		$procedures[]=$row["PROCEDURE_CODE_4"];
		$procedures[]=$row["PROCEDURE_CODE_5"];
		$procedures[]=$row["PROCEDURE_CODE_6"];
		$procedures[]=$row["PROCEDURE_CODE_7"];
		$procedures[]=$row["PROCEDURE_CODE_8"];
		$procedures[]=$row["PROCEDURE_CODE_9"];
		$procedures[]=$row["PROCEDURE_CODE_10"];
		$procedures[]=$row["PROCEDURE_CODE_11"];
		$procedures[]=$row["PROCEDURE_CODE_12"];
		$procedures[]=$row["PROCEDURE_CODE_13"];
		$procedures[]=$row["PROCEDURE_CODE_14"];
		$procedures[]=$row["PROCEDURE_CODE_15"];
		$procedures[]=$row["PROCEDURE_CODE_16"];
		$procedures[]=$row["PROCEDURE_CODE_17"];
		$procedures[]=$row["PROCEDURE_CODE_18"];
		$procedures[]=$row["PROCEDURE_CODE_19"];
		$procedures[]=$row["PROCEDURE_CODE_20"];
		$procedures[]=$row["PROCEDURE_CODE_21"];
		$procedures[]=$row["PROCEDURE_CODE_22"];
		$procedures[]=$row["PROCEDURE_CODE_23"];
		$procedures[]=$row["PROCEDURE_CODE_24"];
		$procedures[]=$row["PROCEDURE_CODE_25"];

		$obj=array('name'=>$row["RECORD_ID"],'AGE'=>$row["AGE"],'SEX'=>$row["SEX"],'RACE'=>$row["RACE"],'LENGTH_OF_STAY'=>$row["LENGTH_OF_STAY"],'id'=>$row["NATIONAL_PROVIDER_ID"],'procedures'=>$procedures,'color'=>$color);
		$patients[]=$obj;
		unset($procedures);
		//$procedures=array();	
		

    }

   echo json_encode($chart2);

} else {
    echo $chart2_sql;
    echo "0 results";
}
?>
