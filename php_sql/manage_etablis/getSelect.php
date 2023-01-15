<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, Authorization,X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, ADD");
header("Allow: GET, POST, OPTIONS, PUT, ADD");


$con = mysqli_connect("localhost","root","", "manage_etabb");


$sql = "SELECT * FROM groupe";
$sql1 = "SELECT * FROM section";
$sql2 = "SELECT * FROM salle";
$sql3 = "SELECT * FROM formateur";


$result = mysqli_query($con,$sql);
$result1 = mysqli_query($con,$sql1);
$result2 = mysqli_query($con,$sql2);
$result3 = mysqli_query($con,$sql3);


$result_array = array();
$result_array1 = array();
$result_array2 = array();
$result_array3 = array();

while($row = mysqli_fetch_assoc($result)) {
    array_push($result_array, $row);
}
while($row1 = mysqli_fetch_assoc($result1)) {
    array_push($result_array1, $row1);
}
while($row2 = mysqli_fetch_assoc($result2)) {
    array_push($result_array2, $row2);
}
while($row3 = mysqli_fetch_assoc($result3)) {
    array_push($result_array3, $row3);
}


$arr = array(
    "groupe"  => $result_array,
    "section"  => $result_array1,
    "salle"  => $result_array2,
    "formateur"  => $result_array3,
);

echo json_encode($arr);

?>